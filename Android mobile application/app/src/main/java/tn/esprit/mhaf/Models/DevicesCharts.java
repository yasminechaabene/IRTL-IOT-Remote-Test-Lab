package tn.esprit.mhaf.Models;



public class DevicesCharts {

    private String nomdevice;
    private String status;

    public DevicesCharts() {
    }

    public DevicesCharts(String nomdevice, String status) {
        this.nomdevice = nomdevice;
        this.status = status;
    }

    public String getNomdevice() {
        return nomdevice;
    }

    public void setNomdevice(String nomdevice) {
        this.nomdevice = nomdevice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
