package tn.esprit.mhaf.Menu.Lists;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
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

import tn.esprit.mhaf.Adapters.TemplateAdapter;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.Models.Template;
import tn.esprit.mhaf.R;

public class TemplateActivity extends AppCompatActivity {

    List<Template> templateList ;
    Animation slidefromleft;
    RecyclerView recyclerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_template);

        recyclerView =(RecyclerView) findViewById(R.id.recylcerView);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        templateList = new ArrayList<>();
        loadTemplate();
        runAnimation(recyclerView,0);
        //slidefromleft = AnimationUtils.loadAnimation(this,R.anim.layout_slide_from_left);
        //recyclerView.setAnimation(slidefromleft);

    }

    /*private void loadTemplate() {

        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_TemplateList,
                response -> {
                        try {

                            JSONArray array = new JSONArray(response);


                            for (int i = 0; i < array.length(); i++) {

                                JSONObject datagroup = array.getJSONObject(i);
                                JSONArray datatype =  datagroup.getJSONArray("datagroups");


                                for(int j = 0; j < datatype.length(); j++ ){
                                    JSONObject daatt = datatype.getJSONObject(j);
                                    templateList.add(new Template(

                                            datagroup.getString("name"),
                                            datagroup.getString("description")
                                           // daatt.getString("name")

                                    ));
                                }
                            }


                            TemplateAdapter adapter = new TemplateAdapter(TemplateActivity.this, templateList);
                            recyclerView.setAdapter(adapter);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    },
                error -> {

                });



        stringRequest.setShouldCache(false);

        RequestQueue queue = Volley.newRequestQueue(this.getApplicationContext());
        queue.add(stringRequest);

    }




*/



    private void loadTemplate() {

        StringRequest stringRequest = new StringRequest(Request.Method.GET, Constants.URL_TemplateList,
                response -> {
                    try {
                        //converting the string to json array object
                        JSONArray array = new JSONArray(response);

                        //traversing through all the object
                        for (int i = 0; i < array.length(); i++) {
                            //getting product object from json array
                            JSONObject datatype = array.getJSONObject(i);


                            templateList.add(new Template(
                                    datatype.getString("name"),
                                    datatype.getString("description")



                            ));
                        }

                        //creating adapter object and setting it to recyclerview
                        TemplateAdapter adapter = new TemplateAdapter(TemplateActivity.this, templateList);
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
        TemplateAdapter adapter = new TemplateAdapter(context,templateList);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutAnimation(controller);
        recyclerView.getAdapter().notifyDataSetChanged();
        recyclerView.scheduleLayoutAnimation();
    }
}
