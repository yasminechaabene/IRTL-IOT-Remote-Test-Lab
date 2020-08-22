package tn.esprit.mhaf.Menu.Map;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.DevicesMap;
import tn.esprit.mhaf.R;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;


import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MapActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    List<DevicesMap> devicesList ;
    Double latitude,longitude;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        devicesList = new ArrayList<>();
             SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(MapActivity.this);

    }


    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_DevicesList,
                response -> {
                    try {

                        //converting the string to json array object
                        JSONArray array = new JSONArray(response);

                        //traversing through all the object
                        for (int i = 0; i < array.length(); i++) {
                            //getting product object from json array
                            JSONObject devicesmap = array.getJSONObject(i);

                            devicesList.add(new DevicesMap(

                                    longitude=   devicesmap.getDouble("longitude"),
                                    latitude=  devicesmap.getDouble("latitude")

                            ));
                            System.out.println("longitude est "+longitude+"latitude est"+latitude);
                            Toast.makeText(getApplicationContext(),"longitude"+longitude+"latitude"+latitude,Toast.LENGTH_SHORT).show();
                            LatLng sydney = new LatLng(longitude,latitude);


                            mMap.addMarker(new MarkerOptions().position(sydney).title("Devices"));
                            mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
                        }
                        //  }
                        System.out.println("longitude estt "+longitude+"latitude estt"+latitude);
                        //creating adapter object and setting it to recyclerview
                        // DevicesAdapter adapter = new DevicesAdapter(DevicesActivity.this, devicesList);
                        //recyclerView.setAdapter(adapter);
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
        // example String

        // Add a marker in Sydney and move the camera
       /* LatLng sydney = new LatLng(longitude,latitude);


        mMap.addMarker(new MarkerOptions().position(sydney).title("Devices"));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        */
       // loadDevices();
       // Toast.makeText(getApplicationContext(),"longitude"+longitude+"latitude"+latitude,Toast.LENGTH_SHORT).show();
    }




}














