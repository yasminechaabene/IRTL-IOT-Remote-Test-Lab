package tn.esprit.mhaf.Menu;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import tn.esprit.mhaf.Depart.LoginActivity;
import tn.esprit.mhaf.Menu.Charts.ChartsActivity;
import tn.esprit.mhaf.Menu.Charts.LineChartsActivity;
import tn.esprit.mhaf.Menu.ChatBot.ChatBot;
import tn.esprit.mhaf.Menu.Lists.AccessListActivity;
import tn.esprit.mhaf.Menu.Lists.ConnectedDevicesActivity;
import tn.esprit.mhaf.Menu.Lists.DataGroupActivity;
import tn.esprit.mhaf.Menu.Lists.DataTypeActivity;
import tn.esprit.mhaf.Menu.Lists.DevicesActivity;
import tn.esprit.mhaf.Menu.Lists.TemplateActivity;
import tn.esprit.mhaf.Menu.Map.MapActivity;
import tn.esprit.mhaf.R;

public class HomeDashboard extends AppCompatActivity {

    LinearLayout clickdatatype,clickdatagroupe,clicktemplate,clickdevices,clickconnected,clickaccesslist,clickNews,clickcharts,clickmaps,
            clickchatbot, about,clickdataanalysis,cliclogout;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_dashboard);




        clickdatatype = (LinearLayout) findViewById(R.id.clickdatatype);
        clickdatagroupe = (LinearLayout) findViewById(R.id.clickdatagroup);
        clicktemplate = (LinearLayout) findViewById(R.id.clicktemplate);
        clickdevices = (LinearLayout) findViewById(R.id.clickdevices);
        clickconnected = (LinearLayout) findViewById(R.id.clickconnected);
        clickaccesslist = (LinearLayout) findViewById(R.id.clickaccesslist);

        clickNews = (LinearLayout) findViewById(R.id.clickNews);
        clickcharts = (LinearLayout) findViewById(R.id.clickcharts);
        clickmaps = (LinearLayout) findViewById(R.id.clickmaps);
        clickchatbot = (LinearLayout) findViewById(R.id.clickchatbot);
        about = (LinearLayout) findViewById(R.id.about);
        //
        clickdataanalysis = (LinearLayout) findViewById(R.id.clickchartvalues);


        clickdatatype.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(HomeDashboard.this,DataTypeActivity.class);
                startActivity(i);
            }
        });
        clickdatagroupe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(HomeDashboard.this,DataGroupActivity.class);
                startActivity(i);
            }
        });
        clicktemplate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,TemplateActivity.class);
                startActivity(i);
            }
        });
        clickdevices.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,DevicesActivity.class);
                startActivity(i);
            }
        });
        clickconnected.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,ConnectedDevicesActivity.class);
                startActivity(i);
            }
        });

        clickaccesslist.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,AccessListActivity.class);
                startActivity(i);
            }
        });

        clickNews.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,NewsActivity.class);
                startActivity(i);
            }
        });

        clickcharts.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,ChartsActivity.class);
                startActivity(i);
            }
        });
        clickmaps.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,MapActivity.class);
                startActivity(i);
            }
        });

        clickchatbot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,ChatBot.class);
                startActivity(i);
            }
        });

        about.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,MhafIOT.class);
                startActivity(i);
            }
        });



        clickdataanalysis.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent i = new Intent(HomeDashboard.this,LineChartsActivity.class);
                startActivity(i);
            }
        });














    }


}
