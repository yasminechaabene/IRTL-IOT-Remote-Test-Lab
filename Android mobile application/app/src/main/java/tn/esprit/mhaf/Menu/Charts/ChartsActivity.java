package tn.esprit.mhaf.Menu.Charts;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.utils.ColorTemplate;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.Devices;
import tn.esprit.mhaf.Models.Template;
import tn.esprit.mhaf.R;

public class ChartsActivity extends AppCompatActivity {
    List<Devices> devicesList ;
    List<Template> templateList ;

        float rainfall[] = {98.8f, 123.8f, 161.6f};
        String monthNames[] = {"Jan", "Feb", "Mar"};
        String nom,status;
    //float status;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charts);
        devicesList = new ArrayList<>();
        templateList = new ArrayList<>();
       // setupPieChart();
        getDevice();
    }

    private void setupPieChart() {
//population a list of piecharts

      /*  List<PieEntry> pieEntries = new ArrayList<>();
        for (int i = 0 ; i<rainfall.length;i++)
        {
            pieEntries.add(new PieEntry(rainfall[i],monthNames[i]));
        }
        PieDataSet dataSet = new PieDataSet(pieEntries,"Connected Devices");
        dataSet.setColors(ColorTemplate.COLORFUL_COLORS);
        PieData data = new PieData(dataSet);

        //Get the chart

        PieChart chart = (PieChart) findViewById(R.id.chart);
        chart.setData(data);
        chart.invalidate();*/
       // getDevice();
    }





void getDevice(){

    StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_TemplateList,
            response -> {
                try {
                    //converting the string to json array object
                    JSONArray array = new JSONArray(response);

                    //traversing through all the object
                    for (int i = 0; i < array.length(); i++) {




                            JSONObject daatt = array.getJSONObject(i);
                            templateList.add(new Template(

                                    nom=   daatt.getString("name"),
                                    daatt.getString("location"),
                                    daatt.getString("description"),
                                    status= daatt.getString("ping_time"),
                                     daatt.getString("ping_unit")


                            ));
                            float statusFloat = Float.valueOf(String.valueOf(status));
                            // System.out.println("longitude est "+longitude+"latitude est"+latitude);
                            Toast.makeText(getApplicationContext(),"nom"+nom+"status"+status,Toast.LENGTH_SHORT).show();

                            List<PieEntry> pieEntries = new ArrayList<>();
                            for (int k = 0 ; k<array.length();k++)
                            {
                                pieEntries.add(new PieEntry(statusFloat, nom));
                            }
                            PieDataSet dataSet = new PieDataSet(pieEntries,"Templates");
                            dataSet.setColors(ColorTemplate.COLORFUL_COLORS);
                            PieData data = new PieData(dataSet);

                            //Get the chart

                            PieChart chart = (PieChart) findViewById(R.id.chart);
                            chart.setData(data);
                            chart.invalidate();
                        }


                    //creating adapter object and setting it to recyclerview

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            },
            error -> {

            });

    //adding our stringrequest to queue
    // Volley.newRequestQueue(this).add(stringRequest);


    stringRequest.setShouldCache(false);

    RequestQueue queue = Volley.newRequestQueue(this.getApplicationContext());
    queue.add(stringRequest);

}

}
