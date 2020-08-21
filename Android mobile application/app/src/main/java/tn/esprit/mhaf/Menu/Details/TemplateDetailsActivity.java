package tn.esprit.mhaf.Menu.Details;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class TemplateDetailsActivity extends AppCompatActivity {

    TextView template_namee,template_locatione,template_datagroup_namee;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_template_details);

        template_namee = (TextView) findViewById(R.id.template_name);
        template_locatione = (TextView) findViewById(R.id.template_location);
        template_datagroup_namee = (TextView) findViewById(R.id.template_datagroup_name);

        Intent intent = getIntent();
        String template_name = intent.getStringExtra("template_name");
        String template_location = intent.getStringExtra("template_location");
        String template_datagroup_name = intent.getStringExtra("template_datagroup_name");
        System.out.println(template_name+template_location+template_datagroup_name);

        template_namee.setText(template_name);
        template_locatione.setText(template_location);
        template_datagroup_namee.setText(template_datagroup_name);

    }

}

