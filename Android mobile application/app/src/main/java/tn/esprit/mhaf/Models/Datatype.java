package tn.esprit.mhaf.Models;



public class Datatype {

    private String id;
    private String data_type_name;
    private String data_type_unit;
    private String data_type_type;

    public Datatype() {
    }

    public Datatype(String id, String data_type_name, String data_type_unit, String data_type_type) {
        this.id = id;
        this.data_type_name = data_type_name;
        this.data_type_unit = data_type_unit;
        this.data_type_type = data_type_type;
    }

    public Datatype(String data_type_name, String data_type_unit, String data_type_type) {
        this.data_type_name = data_type_name;
        this.data_type_unit = data_type_unit;
        this.data_type_type = data_type_type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getData_type_name() {
        return data_type_name;
    }

    public void setData_type_name(String data_type_name) {
        this.data_type_name = data_type_name;
    }

    public String getData_type_unit() {
        return data_type_unit;
    }

    public void setData_type_unit(String data_type_unit) {
        this.data_type_unit = data_type_unit;
    }

    public String getData_type_type() {
        return data_type_type;
    }

    public void setData_type_type(String data_type_type) {
        this.data_type_type = data_type_type;
    }
}
