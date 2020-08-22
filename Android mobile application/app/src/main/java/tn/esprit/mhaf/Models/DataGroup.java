package tn.esprit.mhaf.Models;



public class DataGroup {

    private String id;
    private String name;
    private String description;
    private String accuracy;
    private String time_period;
    private String time_unit;
    private String action;
    private String datatype_name;

    public DataGroup( String name, String description, String action, String datatype_name) {

        this.name = name;
        this.description = description;
        this.action = action;
        this.datatype_name = datatype_name;
    }

    public DataGroup(String id, String name, String description, String accuracy, String time_period, String time_unit, String action, String datatype_name) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.accuracy = accuracy;
        this.time_period = time_period;
        this.time_unit = time_unit;
        this.action = action;
        this.datatype_name = datatype_name;
    }


    public DataGroup(String name, String description, String accuracy, String time_period, String time_unit, String action) {
        this.name = name;
        this.description = description;
        this.accuracy = accuracy;
        this.time_period = time_period;
        this.time_unit = time_unit;
        this.action = action;
    }

    public DataGroup() {
    }

    public DataGroup(String name, String description, String accuracy, String time_period, String time_unit, String action, String datatype_name) {
        this.name = name;
        this.description = description;
        this.accuracy = accuracy;
        this.time_period = time_period;
        this.time_unit = time_unit;
        this.action = action;
        this.datatype_name = datatype_name;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(String accuracy) {
        this.accuracy = accuracy;
    }

    public String getTime_period() {
        return time_period;
    }

    public void setTime_period(String time_period) {
        this.time_period = time_period;
    }

    public String getTime_unit() {
        return time_unit;
    }

    public void setTime_unit(String time_unit) {
        this.time_unit = time_unit;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDatatype_name() {
        return datatype_name;
    }

    public void setDatatype_name(String datatype_name) {
        this.datatype_name = datatype_name;
    }
}
