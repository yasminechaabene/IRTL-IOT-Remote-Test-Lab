package tn.esprit.mhaf.Menu.Lists;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LayoutAnimationController;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import tn.esprit.mhaf.Adapters.DevicesAdapter;
import tn.esprit.mhaf.Depart.LoginActivity;
import tn.esprit.mhaf.Menu.HomeDashboard;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.Devices;
import tn.esprit.mhaf.R;

public class DevicesActivity extends AppCompatActivity {

    List<Devices> devicesList ;
    Animation slidefromleft;
    RecyclerView recyclerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_devices);

        recyclerView =(RecyclerView) findViewById(R.id.recylcerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        devicesList = new ArrayList<>();
        loadDevices();
         runAnimation(recyclerView,0);
//        slidefromleft = AnimationUtils.loadAnimation(this,R.anim.layout_slide_from_left);
  //      recyclerView.setAnimation(slidefromleft);

    }

    private void loadDevices() {

        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_DevicesList,
                response -> {
                    try {
                        /*
                        *     JSONArray datatype =  datagroup.getJSONArray("datatypes");
                            Toast.makeText(this, "hola : " + datatype.getString(2), Toast.LENGTH_SHORT).show();
                            */
                        //converting the string to json array object
                        JSONArray array = new JSONArray(response);

                        //traversing through all the object
                        for (int i = 0; i < array.length(); i++) {
                            //getting product object from json array
                            JSONObject datagroup = array.getJSONObject(i);
                            //JSONArray datatype =  datagroup.getJSONArray("datagroups");


                          //  for(int j = 0; j < datatype.length(); j++ ){
                               // JSONObject daatt = datatype.getJSONObject(j);
                                devicesList.add(new Devices(

                                        datagroup.getString("name"),
                                        datagroup.getString("longitude"),
                                        datagroup.getString("latitude"),
                                        datagroup.getString("description"),
                                        datagroup.getString("templates_id"),
                                        datagroup.getString("status"),
                                        datagroup.getString("last_time")
                                       // daatt.getString("name")

                                ));
                            }
                      //  }

                        //creating adapter object and setting it to recyclerview
                        DevicesAdapter adapter = new DevicesAdapter(DevicesActivity.this, devicesList);
                        recyclerView.setAdapter(adapter);
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


    public void UserLogin()throws JSONException{
        String REQUEST_TAG = "com.androidtutorialpoint.volleyJsonObjectRequest";


            // progressDialog.setMessage("Loading...");
            //  progressDialog.show();
            // Request parameters to be send with post request
            StringRequest postRequest = new StringRequest(Request.Method.GET, "127.0.0.1/5000/models/getModels",
                    /*"?email="+editTextUsername.getText().toString()+"&password="+editTextPassword.getText().toString(),
                     the request body, which is a JsonObject otherwise null*/
                    new Response.Listener<String>(){
                        @Override
                        public void onResponse(String response) {
                            if(response.contains("token")){
                                String json = response.substring(response.indexOf("{")  , response.length());
                                try {
                                    JSONObject data = (JSONObject) new JSONObject(json);


                                    startActivity(new Intent(DevicesActivity.this, HomeDashboard.class));
                                    finish();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }else{
                                Toast.makeText(DevicesActivity.this,"Username/Password Invalide!",Toast.LENGTH_SHORT).show();
                                // progressDialog.hide();
                            }
                            //progressDialog.hide();

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(DevicesActivity.this,"Try Again it may be a internet problem",Toast.LENGTH_SHORT).show();
                            // progressDialog.hide();
                        }
                    }
            );}
    private void runAnimation(RecyclerView recyclerView , int type)
    {
        Context context = recyclerView.getContext();
        LayoutAnimationController controller = null;
        if(type==0)

            controller = AnimationUtils.loadLayoutAnimation(context,R.anim.layout_slide_from_left);
        DevicesAdapter adapter = new DevicesAdapter(context,devicesList);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutAnimation(controller);
        recyclerView.getAdapter().notifyDataSetChanged();
        recyclerView.scheduleLayoutAnimation();
    }
}
