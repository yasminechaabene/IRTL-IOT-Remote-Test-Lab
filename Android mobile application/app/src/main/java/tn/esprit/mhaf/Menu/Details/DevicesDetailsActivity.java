package tn.esprit.mhaf.Menu.Details;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class DevicesDetailsActivity extends AppCompatActivity {


    TextView device_namee,device_descriptione;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_devices_details);


        device_namee = (TextView) findViewById(R.id.device_name);
        device_descriptione = (TextView) findViewById(R.id.device_description);

        Intent intent = getIntent();
        String device_name = intent.getStringExtra("device_name");
        String device_description = intent.getStringExtra("device_description");

        device_namee.setText(device_name);
        device_descriptione.setText(device_description);

    }

}
