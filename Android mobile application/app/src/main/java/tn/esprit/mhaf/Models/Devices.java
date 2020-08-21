package tn.esprit.mhaf.Models;



public class Devices {

    private String id;
    private String name;
    private String longitude;
    private String latitude;
    private String description;
    private String template_name;
    private String status;
    private String last_time;

    public Devices() {
    }

    public Devices(String name, String description, String last_time) {
        this.name = name;
        this.description = description;
        this.last_time = last_time;
    }

    public Devices(String longitude, String latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Devices(String status) {
        this.status = status;
    }

    public Devices(String name, String longitude, String latitude, String description, String template_name, String status, String last_time) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.template_name = template_name;
        this.status = status;
        this.last_time = last_time;
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

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTemplate_name() {
        return template_name;
    }

    public void setTemplate_name(String template_name) {
        this.template_name = template_name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLast_time() {
        return last_time;
    }

    public void setLast_time(String last_time) {
        this.last_time = last_time;
    }
}
