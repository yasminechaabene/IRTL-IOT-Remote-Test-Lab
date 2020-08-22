package tn.esprit.mhaf.Depart;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import tn.esprit.mhaf.Menu.HomeDashboard;
import tn.esprit.mhaf.R;
import tn.esprit.mhaf.utils.AppSingleton;
import tn.esprit.mhaf.utils.Constants;
import tn.esprit.mhaf.utils.RequestHandler;

public class LoginActivity extends AppCompatActivity {
     LinearLayout l1,l2;
    private EditText editTextUsername,editTextPassword;
    private Button buttonLogin;
    Animation uptodonw,downtoup;


    public static final String ServerAddress = "http://127.0.0.1:5000/";
    public static final String ServerURL = LoginActivity.ServerAddress+"auth/token";
    public static String token="";

    ProgressDialog progressDialog;

    private static final String TAG = "LoginActivity";



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);


        l1 = (LinearLayout)findViewById(R.id.l1);
        l2 = (LinearLayout)findViewById(R.id.l2);
        editTextUsername = (EditText)findViewById(R.id.editTextUsername);
        editTextPassword = (EditText)findViewById(R.id.editTextPassword);
        buttonLogin = (Button)findViewById(R.id.buttonLogin);
        uptodonw = AnimationUtils.loadAnimation(this,R.anim.uptodown);
        l1.setAnimation(uptodonw);


        downtoup = AnimationUtils.loadAnimation(this,R.anim.downtoup);
        l2.setAnimation(downtoup);


        buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (v == buttonLogin){

                    try {
                        UserLoginStatic();
                        //UserLogin();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }


                }

            }
        });
    }




    public void UserLoginStatic()throws  JSONException{

        if ( editTextUsername.getText().toString().equals("user")&& editTextPassword.getText().toString().equals("user") )
        {

           // Toast.makeText(LoginActivity.this,"Username/Password Invalide!",Toast.LENGTH_SHORT).show();
            startActivity(new Intent(LoginActivity.this,HomeDashboard.class));
            finish();
        }
        else
            {
                Toast.makeText(LoginActivity.this, "Username/Password Invalide!", Toast.LENGTH_SHORT).show();

            }
    }

    public void UserLogin()throws JSONException{
        String REQUEST_TAG = "com.androidtutorialpoint.volleyJsonObjectRequest";

        if (verification()){
           // progressDialog.setMessage("Loading...");
          //  progressDialog.show();
            // Request parameters to be send with post request
            StringRequest postRequest = new StringRequest(Request.Method.GET, ServerURL+"/users/login",
                    //"?email="+editTextUsername.getText().toString()+"&password="+editTextPassword.getText().toString(), // the request body, which is a JsonObject otherwise null
                    new Response.Listener<String>(){
                        @Override
                        public void onResponse(String response) {
                            if(response.contains("token")){
                                String json = response.substring(response.indexOf("{")  , response.length());
                                try {
                                    JSONObject data = (JSONObject) new JSONObject(json);
                                    String token = data.getString("token");
                                    LoginActivity.token = token;
                                    Log.e("token", token);
                                   // new CurrentUser(LoginActivity.this);
                                  //  progressDialog.hide();
                                    startActivity(new Intent(LoginActivity.this,HomeDashboard.class));
                                    finish();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }else{
                                Toast.makeText(LoginActivity.this,"Username/Password Invalide!",Toast.LENGTH_SHORT).show();
                               // progressDialog.hide();
                            }
                            //progressDialog.hide();

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(LoginActivity.this,"Try Again it may be a internet problem",Toast.LENGTH_SHORT).show();
                           // progressDialog.hide();
                        }
                    }
            );

            // Adding JsonObject request to request queue
            AppSingleton.getInstance(getApplicationContext()).addToRequestQueue(postRequest, REQUEST_TAG);

           // RequestQueue queue = Volley.newRequestQueue(this.getApplicationContext());
            //queue.add(postRequest);
        }






    }
    public boolean verification(){
        Boolean verifcationBool = true;
        if ((editTextUsername.getText().toString().equals(""))){
            editTextUsername.setError("enter a username");
//            progressDialog.hide();
            verifcationBool = false;
            onPause();

        }
        if (editTextPassword.getText().toString().equals("")){
            editTextPassword.setError("enter a password");
          //  progressDialog.hide();
            verifcationBool = false;
            onPause();

        }
        return verifcationBool;
    }





   /* public void loginAction(View view) throws JSONException {
        String REQUEST_TAG = "com.androidtutorialpoint.volleyJsonObjectRequest";
        if (verification()){
            progressDialog.setMessage("Loading...");
            progressDialog.show();
            // Request parameters to be send with post request
            StringRequest postRequest = new StringRequest(Request.Method.POST, ServerURL, // the request body, which is a JsonObject otherwise null
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            if(response.contains("token")){
                                String json = response.substring(response.indexOf("{")  , response.length());
                                try {
                                    JSONObject data = (JSONObject) new JSONObject(json).get("data");
                                    String token = data.getString("token");
                                    LoginActivity.token = token;
                                    Log.e("token", token);
                                    new CurrentUser(LoginActivity.this);
                                    progressDialog.hide();
                                    startActivity(new Intent(LoginActivity.this,MainActivity.class));

                                    overridePendingTransition(R.anim.push_left_in, R.anim.push_left_out);
                                    finish();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }else{
                                Toast.makeText(LoginActivity.this,"Username/Password Invalide!",Toast.LENGTH_SHORT).show();
                                progressDialog.hide();
                            }
                            //progressDialog.hide();

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast.makeText(LoginActivity.this,"Try Again it may be a internet problem",Toast.LENGTH_SHORT).show();
                            progressDialog.hide();
                        }
                    }
            ) {
                @Override
                public byte[] getBody() throws AuthFailureError {
                    HashMap<String, String> params2 = new HashMap<String, String>();
                    params2.put("username", edtUsername.getText().toString());
                    params2.put("password", edtPassword.getText().toString());
                    return new JSONObject(params2).toString().getBytes();

                }

                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json; charset=utf-8");
                    return headers;
                }

                @Override
                public String getBodyContentType() {
                    return "application/json";
                }


            };

            // Adding JsonObject request to request queue
            AppSingleton.getInstance(getApplicationContext()).addToRequestQueue(postRequest, REQUEST_TAG);
        }





    }

    public void signup(View view) {
        Intent intent = new Intent(LoginActivity.this,RegistreActivity.class);
        startActivity(intent);
        overridePendingTransition(R.anim.push_left_in, R.anim.push_left_out);
    }

    public boolean verification(){
        Boolean verifcationBool = true;
        if ((edtUsername.getText().toString().equals(""))){
            edtUsername.setError("enter a username");
            progressDialog.hide();
            verifcationBool = false;
            onPause();

        }
        if (edtPassword.getText().toString().equals("")){
            edtPassword.setError("enter a password");
            progressDialog.hide();
            verifcationBool = false;
            onPause();

        }
        return verifcationBool;
    }*/

}
