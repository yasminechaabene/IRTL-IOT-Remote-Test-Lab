package tn.esprit.mhaf.Models;



public class AccessList {

    private String id;
    private String application_name;
    private String password;
    private String description;
    private String device_template;
    private String device_name ;
    private String Datagroups ;
    private String datatype ;
    private String accesstype ;

    public AccessList(String id, String application_name, String description, String device_template, String device_name, String datagroups, String datatype, String accesstype) {
        this.id = id;
        this.application_name = application_name;
        this.description = description;
        this.device_template = device_template;
        this.device_name = device_name;
        Datagroups = datagroups;
        this.datatype = datatype;
        this.accesstype = accesstype;
    }

    public AccessList(String application_name, String description, String device_template, String device_name, String datagroups, String datatype, String accesstype) {
        this.application_name = application_name;
        this.description = description;
        this.device_template = device_template;
        this.device_name = device_name;
        Datagroups = datagroups;
        this.datatype = datatype;
        this.accesstype = accesstype;
    }

    public AccessList(String application_name, String accesstype) {
        this.application_name = application_name;
        this.accesstype = accesstype;
    }

    public AccessList(String application_name, String description, String accesstype) {
        this.application_name = application_name;
        this.description = description;
        this.accesstype = accesstype;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApplication_name() {
        return application_name;
    }

    public void setApplication_name(String application_name) {
        this.application_name = application_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDevice_template() {
        return device_template;
    }

    public void setDevice_template(String device_template) {
        this.device_template = device_template;
    }

    public String getDevice_name() {
        return device_name;
    }

    public void setDevice_name(String device_name) {
        this.device_name = device_name;
    }

    public String getDatagroups() {
        return Datagroups;
    }

    public void setDatagroups(String datagroups) {
        Datagroups = datagroups;
    }

    public String getDatatype() {
        return datatype;
    }

    public void setDatatype(String datatype) {
        this.datatype = datatype;
    }

    public String getAccesstype() {
        return accesstype;
    }

    public void setAccesstype(String accesstype) {
        this.accesstype = accesstype;
    }
}
