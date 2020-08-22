package tn.esprit.mhaf.Models;



public class Template {

    private String id;
    private String name;
    private String location;
    private String timezone;
    private String description;
    private String noOfPackets;
    private String timePeriod;
    private String dataSource;
    private String MQTTTopic;
    private String unity;
    private String datagroup_name;

    private String pingTime;
   private String pingunit;

    public Template(String name, String location, String description, String pingTime, String pingunit) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.pingTime = pingTime;
        this.pingunit = pingunit;
    }

    public String getPingTime() {
        return pingTime;
    }




    public void setPingTime(String pingTime) {
        this.pingTime = pingTime;
    }

    public String getPingunit() {
        return pingunit;
    }

    public void setPingunit(String pingunit) {
        this.pingunit = pingunit;
    }

    public Template(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Template(String name, String location, String datagroup_name) {
        this.name = name;
        this.location = location;
        this.datagroup_name = datagroup_name;
    }

    public Template(String id, String name, String MQTTTopic, String dataSource, String location, String timezone, String timePeriod, String description, String noOfPackets, String unity, String datagroup_name) {
        this.id = id;
        this.name = name;
        this.MQTTTopic = MQTTTopic;
        this.dataSource = dataSource;
        this.location = location;
        this.timezone = timezone;
        this.timePeriod = timePeriod;
        this.description = description;
        this.noOfPackets = noOfPackets;
        this.unity = unity;
        this.datagroup_name = datagroup_name;
    }


    public Template() {
    }

    public Template(String name, String MQTTTopic, String dataSource, String location, String timezone, String timePeriod, String description, String noOfPackets, String unity, String datagroup_name) {
        this.name = name;
        this.MQTTTopic = MQTTTopic;
        this.dataSource = dataSource;
        this.location = location;
        this.timezone = timezone;
        this.timePeriod = timePeriod;
        this.description = description;
        this.noOfPackets = noOfPackets;
        this.unity = unity;
        this.datagroup_name = datagroup_name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMQTTTopic() {
        return MQTTTopic;
    }

    public void setMQTTTopic(String MQTTTopic) {
        this.MQTTTopic = MQTTTopic;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(String timePeriod) {
        this.timePeriod = timePeriod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNoOfPackets() {
        return noOfPackets;
    }

    public void setNoOfPackets(String noOfPackets) {
        this.noOfPackets = noOfPackets;
    }

    public String getUnity() {
        return unity;
    }

    public void setUnity(String unity) {
        this.unity = unity;
    }

    public String getDatagroup_name() {
        return datagroup_name;
    }

    public void setDatagroup_name(String datagroup_name) {
        this.datagroup_name = datagroup_name;
    }
}
