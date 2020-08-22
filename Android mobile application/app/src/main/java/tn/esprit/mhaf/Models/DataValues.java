package tn.esprit.mhaf.Models;



public class DataValues {

private String id;
private String data_id;
private float value;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getData_id() {
        return data_id;
    }

    public void setData_id(String data_id) {
        this.data_id = data_id;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public DataValues() {
    }

    public DataValues(String data_id, float value) {
        this.data_id = data_id;
        this.value = value;
    }

    public DataValues(float value) {
        this.value = value;
    }
}
