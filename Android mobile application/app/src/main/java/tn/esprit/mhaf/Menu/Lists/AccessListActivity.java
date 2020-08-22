package tn.esprit.mhaf.Menu.Lists;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LayoutAnimationController;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfWriter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import tn.esprit.mhaf.Adapters.AccessListAdapter;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.AccessList;
import tn.esprit.mhaf.R;

public class AccessListActivity extends AppCompatActivity {
    List<AccessList> accessList ;
    Animation slidefromleft;
    RecyclerView recyclerView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_access_list);

        recyclerView =(RecyclerView) findViewById(R.id.recylcerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        accessList = new ArrayList<>();
        loadAccessList();
        runAnimation(recyclerView,0);


    }




    private void loadAccessList() {

        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_AccessTypeControl_android,
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
                            JSONObject datatype = array.getJSONObject(i);


                            accessList.add(new AccessList(

                                    datatype.getString("application_name"),
                                    datatype.getString("description"),
                                    datatype.getString("accesstype")


                            ));
                        }

                        //creating adapter object and setting it to recyclerview
                        AccessListAdapter adapter = new AccessListAdapter(AccessListActivity.this, accessList);
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



    private void runAnimation(RecyclerView recyclerView , int type)
    {
        Context context = recyclerView.getContext();
        LayoutAnimationController controller = null;
        if(type==0)

            controller = AnimationUtils.loadLayoutAnimation(context,R.anim.layout_slide_from_left);
        AccessListAdapter adapter = new AccessListAdapter(context,accessList);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutAnimation(controller);
        recyclerView.getAdapter().notifyDataSetChanged();
        recyclerView.scheduleLayoutAnimation();
    }
}
