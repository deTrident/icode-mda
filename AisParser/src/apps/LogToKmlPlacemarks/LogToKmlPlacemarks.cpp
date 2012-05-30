#include <iostream>
#include <stdexcept>
#include <string>

#include <boost/timer/timer.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/algorithm/string.hpp>

//Input sources
#include <AisFlatFileInputSource.h>

//Output sources
#include <AisKmlPlacemarkWriter.h>

//Parsers
#include <AisMsisSentenceParser.h>
#include <AisSatSentenceParser.h>
#include <AisMessageParser.h>

#include <AisMessage.h>
#include <AisDebug.h>

using namespace std;

void usage()
{
	cerr << "AisParserApp.exe <input-filename> <number-of-entries-per-kml>" << endl;
	cerr << "Will create a file named <input-filename>.p<partition-number>.kml with the parsed AIS.\nThis file will be suitable for opening in Google Earth." << endl;
	cerr << "<number-of-entries-per-kml> is the number of entries per file.\nIt will create mutliple files named <input-filename><file-number>.kml.\nIf set to 0, it will push all to a single file." << endl;
}

//========================================================================================
//========================================================================================
//========================================================================================
//========================================================================================

int main(int argc, char** argv)
{

	//parse args
	if(argc!=3)
	{
		usage();
		return -1;
	}

	boost::timer::auto_cpu_timer timer;

	string filename = argv[1];
	unsigned int messagesPerFile = 0;
	try
	{
		messagesPerFile = boost::lexical_cast<unsigned int>(argv[2]);
	}
	catch(exception& e)
	{
		cerr << e.what() << endl;
		cerr << "Setting messages per file to 0" << endl;
		messagesPerFile = 0;
	}
	
	//Define input class (an AisInputSource)
	//STEPX: choose the correct type of input source
	AisFlatFileInputSource aisInputSource(filename);
	
	unsigned int partition = 0;

	while(aisInputSource.isReady())
	{

		//Define output class (an AisWriter)
		//STEPX: choose the correct type of output source
		AisKmlPlacemarkWriter aisWriter(filename + ".p" + boost::lexical_cast<string>(partition++) );

		if(!aisWriter.isReady())
		{
			aisDebug("AisWriter is not ready");
			return -1;
		}

		for(unsigned int messageCount = 0; ((messagesPerFile == 0) || (messageCount < messagesPerFile)) && (aisInputSource.isReady()); messageCount++)
		{

			//load the next sentence from the AIS input to the parser
			//STEPX: choose the correct type of sentence parser
			AisSatSentenceParser aisSentenceParser(aisInputSource.getNextSentence());
			AisMessageParser aisMessageParser;

			if(aisSentenceParser.isMessageValid())
			{
				//This check is to make sure that if the first sentence of the message
				//was bad we won't read the second sentence and parse it as a new message
				if(aisSentenceParser.getSentenceNumber()==1)
				{
					aisMessageParser.addData(aisSentenceParser.getData());	
					//if the current sentence is part of a multipart message
					//grab the next message until you have them all, or message is invalid
					try
					{
						while(aisSentenceParser.getSentenceNumber() < aisSentenceParser.getNumberOfSentences())
						{
							aisSentenceParser.setSentence(aisInputSource.getNextSentence());
							if(aisSentenceParser.isMessageValid()){
								aisMessageParser.addData(aisSentenceParser.getData());	
							}
							else
							{
								//aisDebug("Invalid multipart message:\n" + aisSentenceParser.getCurrentSentence());
								throw std::runtime_error("Invalid multipart message");
							}
						}

						AisMessage aisMessage = aisMessageParser.parseMessage();
						//add time from ais sentence to the ais message
						aisMessage.setDATETIME(aisSentenceParser.getTimestamp());
						//add streamid from ais sentence to the ais message
						aisMessage.setSTREAMID(aisSentenceParser.getStreamId());

						aisWriter.writeEntry(aisMessage);
					}
					catch(exception &e)
					{
						cerr << e.what() << endl;
					}
				}
				else
				{
					aisDebug("First sentence of message was invalid/not receieved.\nSkipping the rest of the sentences of this message");
					continue;
				}
			}
			else
			{
				//aisDebug("Invalid message:\n" + aisSentenceParser.getCurrentSentence());
			}
		}
	}
	return 0;
}

