package tn.esprit.mhaf.Menu.Charts;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import tn.esprit.mhaf.Models.DataValues;
import tn.esprit.mhaf.R;
import tn.esprit.mhaf.utils.Constants;

public class LineChartsActivity extends AppCompatActivity  {


    private static final String TAG = "LineChartsActivity";
    private LineChart mcChart;
    List<Integer> values;
    float yy= 70f;
    List<DataValues> datavaluesList ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_line_charts);
        datavaluesList = new ArrayList<>();
       // datavaluesList.add(new DataValues("dummy",0.1f));
       // yy = new ArrayList<>();

        mcChart = ( LineChart) findViewById(R.id.linechart);


        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_DataValues,
                response -> {
                    try {
                        //converting the string to json array object
                        JSONArray array = new JSONArray(response);

                        //traversing through all the object
                        for (int i = 0; i < array.length(); i++) {
                            //getting product object from json array
                            JSONObject datavalues = array.getJSONObject(i);


                            datavaluesList.add(new DataValues(
                                    datavalues.getString("data_id"),
                                 datavalues.getInt("value")



                            ));
                            Toast.makeText(getApplicationContext(),"values"+values,Toast.LENGTH_SHORT).show();
                            System.out.println("values"+values);
                            mcChart.setDragEnabled(true);
                            mcChart.setScaleEnabled(false);

                            ArrayList<Entry> yvalues = new ArrayList<>();

                           // yvalues.add(new Entry(values,values));


                            /*0yvalues.add(new Entry(1,60f));
                            yvalues.add(new Entry(2,70f));
                            yvalues.add(new Entry(3,80f));
                            yvalues.add(new Entry(4,90f));
                            yvalues.add(new Entry(5,600f));
                            yvalues.add(new Entry(6,20f));*/

                            int index = 0;
                            for (DataValues item : datavaluesList) {
                                index++;
                                yvalues.add(new Entry(index,item.getValue()));
                            }



                            LineDataSet set1 = new LineDataSet(yvalues,"Data Values");
                            set1.setFillAlpha(110);
                            set1.setColor(R.color.colorFlower);
                            set1.setLineWidth(3f);
                            set1.setValueTextSize(10f);
                            set1.setValueTextColor(R.color.colorGrass);
                            ArrayList<ILineDataSet> dataSets = new ArrayList<>();
                            dataSets.add(set1);
                            LineData data = new LineData(dataSets);
                            mcChart.setData(data);
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

       // mcChart.setOnChartGestureListener(LineChartsActivity.this);
        //mcChart.setOnChartValueSelectedListener(LineChartsActivity.this);


        mcChart.setDragEnabled(true);
        mcChart.setScaleEnabled(false);

        ArrayList<Entry> yvalues = new ArrayList<>();

        //yvalues.add(new Entry(values,values));
      /*  yvalues.add(new Entry(1,60f));
        yvalues.add(new Entry(2,70f));
        yvalues.add(new Entry(3,80f));
        yvalues.add(new Entry(4,90f));
        yvalues.add(new Entry(5,600f));
        yvalues.add(new Entry(6,20f));*/

        LineDataSet set1 = new LineDataSet(yvalues,"Data Values");
        set1.setFillAlpha(110);
        set1.setColor(R.color.colorFlower);
        set1.setLineWidth(3f);
        set1.setValueTextSize(10f);
        set1.setValueTextColor(R.color.colorGrass);
        ArrayList<ILineDataSet> dataSets = new ArrayList<>();
        dataSets.add(set1);
        LineData data = new LineData(dataSets);
      //  mcChart.setData(data);


    }



}
