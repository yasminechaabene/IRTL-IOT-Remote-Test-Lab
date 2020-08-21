package tn.esprit.mhaf.Menu.Lists;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LayoutAnimationController;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import tn.esprit.mhaf.Adapters.DevicesAdapter;
import tn.esprit.mhaf.Menu.Notifications.NotificationActivity;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.Devices;
import tn.esprit.mhaf.R;

public class ConnectedDevicesActivity extends AppCompatActivity {

    NotificationCompat.Builder notification;
    private static final int uniqueID = 45612;
    List<Devices> devicesList ;
    Animation slidefromleft;
    RecyclerView recyclerView;
    int currentSize = 0;
    final Handler handler = new Handler();
    public static long UPDATE_PERIOD = 15000;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connected_devices);

        recyclerView =(RecyclerView) findViewById(R.id.recylcerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        devicesList = new ArrayList<>();
        loadConnectedDevices();
         runAnimation(recyclerView,0);


 }

    private void loadConnectedDevices() {

        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_Connected_DevicesList,
                response -> {
                    try {

                        //converting the string to json array object
                        JSONArray array = new JSONArray(response);
                        devicesList.clear();
                        //traversing through all the object
                        for (int i = 0; i < array.length(); i++) {
                            //getting product object from json array
                            JSONObject datagroup = array.getJSONObject(i);
                            //JSONArray datatype =  datagroup.getJSONArray("datagroups");


                            //  for(int j = 0; j < datatype.length(); j++ ){
                            // JSONObject daatt =

                            devicesList.add(new Devices(

                                    datagroup.getString("name"),
                                    datagroup.getString("longitude"),
                                    datagroup.getString("latitude"),
                                    datagroup.getString("description"),
                                    datagroup.getString("templates_id"),
                                    datagroup.getString("status"),
                                    datagroup.getString("last_time")


                            ));
                        }
                        //  }

                        //creating adapter object and setting it to recyclerview
                        DevicesAdapter adapter = new DevicesAdapter(ConnectedDevicesActivity.this, devicesList);
                        recyclerView.setAdapter(adapter);
                        if(devicesList.size()!= this.currentSize){
                            sendNotifications();
                        }
                        this.currentSize = devicesList.size();
                        reloadData();
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

    public void reloadData(){
        this.handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.e("RELOAD DATA","reloading data for devices");
                loadConnectedDevices();
            }
        },UPDATE_PERIOD);
    }




    public  void sendNotifications(){

        notification = new NotificationCompat.Builder(this);
        notification.setAutoCancel(true);
        notification.setSmallIcon(R.drawable.device);
        notification.setTicker("This is the ticker");
        notification.setWhen(System.currentTimeMillis());
        notification.setContentTitle("IRTL Platform");
        notification.setContentText(" device is Connected ");

        Intent intent = new Intent(this, NotificationActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        notification.setContentIntent(pendingIntent);

        //Builds notification and issues it
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        nm.notify(uniqueID, notification.build());



    }





}
