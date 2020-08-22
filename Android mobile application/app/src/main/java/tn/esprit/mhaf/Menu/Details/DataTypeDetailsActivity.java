package tn.esprit.mhaf.Menu.Details;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class DataTypeDetailsActivity extends AppCompatActivity {


    TextView datatype_namee,datatype_unite,datatype_typee;

    //String datatype_name,datatype_type,datatype_type;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data_type_details);

        datatype_namee = (TextView) findViewById(R.id.datatypename);
        datatype_unite = (TextView) findViewById(R.id.datatypeunit);
        datatype_typee = (TextView) findViewById(R.id.datatypetype);

        Intent intent = getIntent();
        String datatype_name = intent.getStringExtra("datatype_name");
        String datatype_unit = intent.getStringExtra("datatype_unit");
        String datatype_type = intent.getStringExtra("datatype_type");
        System.out.println(datatype_name+datatype_unit+datatype_type);

        datatype_namee.setText(datatype_name);
        datatype_unite.setText(datatype_unit);
        datatype_typee.setText(datatype_type);
    }
}
