package tn.esprit.mhaf.Menu.Details;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class AccessListDetailsActivity extends AppCompatActivity {


    TextView access_namee,access_desce,access_typee;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_access_list_details);



        access_namee = (TextView) findViewById(R.id.access_name);
        access_desce = (TextView) findViewById(R.id.access_desc);
        access_typee = (TextView) findViewById(R.id.access_type);

        Intent intent = getIntent();
        String access_name = intent.getStringExtra("access_name");
        String access_desc = intent.getStringExtra("access_desc");
        String access_type = intent.getStringExtra("access_type");

        access_namee.setText(access_name);
        access_desce.setText(access_desc);
        access_typee.setText(access_type);


    }
}
