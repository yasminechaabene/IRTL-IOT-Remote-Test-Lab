package tn.esprit.mhaf.Models;



public class DevicesMap {

    private Double longitude;
    private Double latitude;

    public DevicesMap(Double longitude, Double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public DevicesMap() {
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
}
