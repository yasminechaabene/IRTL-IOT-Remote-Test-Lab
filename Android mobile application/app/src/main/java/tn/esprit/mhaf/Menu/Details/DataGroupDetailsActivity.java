package tn.esprit.mhaf.Menu.Details;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class DataGroupDetailsActivity extends AppCompatActivity {

    TextView datagroup_namee,datagroup_desce,datagroup_actione,datagroup_dataname_namee;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data_group_details);

        datagroup_namee = (TextView) findViewById(R.id.datagroup_name);
        datagroup_desce = (TextView) findViewById(R.id.datagroup_desc);
        datagroup_actione = (TextView) findViewById(R.id.datagroup_action);
        datagroup_dataname_namee = (TextView) findViewById(R.id.datagroup_dataname_name);

        Intent intent = getIntent();
        String datagroup_name = intent.getStringExtra("datagroup_name");
        String datagroup_desc = intent.getStringExtra("datagroup_desc");
        String datagroup_action = intent.getStringExtra("datagroup_action");
        String datagroup_dataname_name = intent.getStringExtra("datagroup_dataname_name");
        System.out.println(datagroup_name+datagroup_desc+datagroup_action+datagroup_dataname_name);

        datagroup_namee.setText(datagroup_name);
        datagroup_desce.setText(datagroup_desc);
        datagroup_actione.setText(datagroup_action);
        datagroup_dataname_namee.setText(datagroup_dataname_name);
    }
}
