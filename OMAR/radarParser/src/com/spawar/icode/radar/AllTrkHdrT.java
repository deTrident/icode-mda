//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.1.10 in JDK 6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2012.07.19 at 01:24:49 PM PDT 
//


package com.spawar.icode.radar;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for AllTrkHdr_t complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="AllTrkHdr_t">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sdsTrackID" type="{http://www.suretrak21.com/ST_Track}SdsTrackIDStruct"/>
 *         &lt;element name="systemTrackID" type="{http://www.suretrak21.com/ST_Track}SdsTrackIDStruct"/>
 *         &lt;element name="loc" type="{http://www.suretrak21.com/ST_Track}point_t3"/>
 *         &lt;element name="vec" type="{http://www.suretrak21.com/ST_Track}vector_t3"/>
 *         &lt;element name="bVecValid" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}integer"/>
 *         &lt;element name="quality" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="SdsIndex" type="{http://www.w3.org/2001/XMLSchema}integer"/>
 *         &lt;element name="bIgnoreAlarms" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="time" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="playerListId" type="{http://www.w3.org/2001/XMLSchema}unsignedLong"/>
 *         &lt;element name="bPlayerListIdValid" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *         &lt;element name="remote_name" type="{http://www.suretrak21.com/ST_Track}name33_t"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "AllTrkHdr_t", propOrder = {
    "sdsTrackID",
    "systemTrackID",
    "loc",
    "vec",
    "bVecValid",
    "status",
    "quality",
    "sdsIndex",
    "bIgnoreAlarms",
    "time",
    "playerListId",
    "bPlayerListIdValid",
    "remoteName"
})
public class AllTrkHdrT {

    @XmlElement(required = true)
    protected SdsTrackIDStruct sdsTrackID;
    @XmlElement(required = true)
    protected SdsTrackIDStruct systemTrackID;
    @XmlElement(required = true)
    protected PointT3 loc;
    @XmlElement(required = true)
    protected VectorT3 vec;
    protected boolean bVecValid;
    @XmlElement(required = true)
    protected BigInteger status;
    protected double quality;
    @XmlElement(name = "SdsIndex", required = true)
    protected BigInteger sdsIndex;
    protected boolean bIgnoreAlarms;
    protected double time;
    @XmlElement(required = true)
    @XmlSchemaType(name = "unsignedLong")
    protected BigInteger playerListId;
    protected boolean bPlayerListIdValid;
    @XmlElement(name = "remote_name", required = true)
    protected String remoteName;

    /**
     * Gets the value of the sdsTrackID property.
     * 
     * @return
     *     possible object is
     *     {@link SdsTrackIDStruct }
     *     
     */
    public SdsTrackIDStruct getSdsTrackID() {
        return sdsTrackID;
    }

    /**
     * Sets the value of the sdsTrackID property.
     * 
     * @param value
     *     allowed object is
     *     {@link SdsTrackIDStruct }
     *     
     */
    public void setSdsTrackID(SdsTrackIDStruct value) {
        this.sdsTrackID = value;
    }

    /**
     * Gets the value of the systemTrackID property.
     * 
     * @return
     *     possible object is
     *     {@link SdsTrackIDStruct }
     *     
     */
    public SdsTrackIDStruct getSystemTrackID() {
        return systemTrackID;
    }

    /**
     * Sets the value of the systemTrackID property.
     * 
     * @param value
     *     allowed object is
     *     {@link SdsTrackIDStruct }
     *     
     */
    public void setSystemTrackID(SdsTrackIDStruct value) {
        this.systemTrackID = value;
    }

    /**
     * Gets the value of the loc property.
     * 
     * @return
     *     possible object is
     *     {@link PointT3 }
     *     
     */
    public PointT3 getLoc() {
        return loc;
    }

    /**
     * Sets the value of the loc property.
     * 
     * @param value
     *     allowed object is
     *     {@link PointT3 }
     *     
     */
    public void setLoc(PointT3 value) {
        this.loc = value;
    }

    /**
     * Gets the value of the vec property.
     * 
     * @return
     *     possible object is
     *     {@link VectorT3 }
     *     
     */
    public VectorT3 getVec() {
        return vec;
    }

    /**
     * Sets the value of the vec property.
     * 
     * @param value
     *     allowed object is
     *     {@link VectorT3 }
     *     
     */
    public void setVec(VectorT3 value) {
        this.vec = value;
    }

    /**
     * Gets the value of the bVecValid property.
     * 
     */
    public boolean isBVecValid() {
        return bVecValid;
    }

    /**
     * Sets the value of the bVecValid property.
     * 
     */
    public void setBVecValid(boolean value) {
        this.bVecValid = value;
    }

    /**
     * Gets the value of the status property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setStatus(BigInteger value) {
        this.status = value;
    }

    /**
     * Gets the value of the quality property.
     * 
     */
    public double getQuality() {
        return quality;
    }

    /**
     * Sets the value of the quality property.
     * 
     */
    public void setQuality(double value) {
        this.quality = value;
    }

    /**
     * Gets the value of the sdsIndex property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSdsIndex() {
        return sdsIndex;
    }

    /**
     * Sets the value of the sdsIndex property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSdsIndex(BigInteger value) {
        this.sdsIndex = value;
    }

    /**
     * Gets the value of the bIgnoreAlarms property.
     * 
     */
    public boolean isBIgnoreAlarms() {
        return bIgnoreAlarms;
    }

    /**
     * Sets the value of the bIgnoreAlarms property.
     * 
     */
    public void setBIgnoreAlarms(boolean value) {
        this.bIgnoreAlarms = value;
    }

    /**
     * Gets the value of the time property.
     * 
     */
    public double getTime() {
        return time;
    }

    /**
     * Sets the value of the time property.
     * 
     */
    public void setTime(double value) {
        this.time = value;
    }

    /**
     * Gets the value of the playerListId property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getPlayerListId() {
        return playerListId;
    }

    /**
     * Sets the value of the playerListId property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setPlayerListId(BigInteger value) {
        this.playerListId = value;
    }

    /**
     * Gets the value of the bPlayerListIdValid property.
     * 
     */
    public boolean isBPlayerListIdValid() {
        return bPlayerListIdValid;
    }

    /**
     * Sets the value of the bPlayerListIdValid property.
     * 
     */
    public void setBPlayerListIdValid(boolean value) {
        this.bPlayerListIdValid = value;
    }

    /**
     * Gets the value of the remoteName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRemoteName() {
        return remoteName;
    }

    /**
     * Sets the value of the remoteName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRemoteName(String value) {
        this.remoteName = value;
    }

}
