package tn.esprit.mhaf.Menu;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.CursorLoader;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.gson.Gson;
import com.microsoft.projectoxford.vision.VisionServiceClient;
import com.microsoft.projectoxford.vision.VisionServiceRestClient;
import com.microsoft.projectoxford.vision.contract.AnalysisResult;
import com.microsoft.projectoxford.vision.contract.Caption;
import com.microsoft.projectoxford.vision.rest.VisionServiceException;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import tn.esprit.mhaf.R;

public class NewsActivity extends AppCompatActivity {
 ImageView image;
    Button btncamera,analyzeimage;
    ImageView camera;
    String filePath;
   // Bitmap bitmap;
    public VisionServiceClient visionServiceClient = new VisionServiceRestClient("f7c1e09ed8684152b4052ec82d355e3b","https://westcentralus.api.cognitive.microsoft.com/vision/v1.0");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);

        btncamera = (Button) findViewById(R.id.btncamera);
        camera = (ImageView) findViewById(R.id.camera);
        analyzeimage = (Button) findViewById(R.id.analyzeimage);

       /* Bitmap mBitmap = BitmapFactory.decodeFile(filePath);
         camera.setImageBitmap(mBitmap);*/



        //Convert image to stream
       /* ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        mBitmap.compress(Bitmap.CompressFormat.JPEG,100,outputStream);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());*/

        btncamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(intent,0);

            }
        });


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(data != null) {
            Bitmap bitmap = (Bitmap) data.getExtras().get("data");
            camera.setImageBitmap(bitmap);

            //Convert image to stream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG,100,outputStream);
            ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());


            analyzeimage.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    final   AsyncTask<InputStream,String,String> visionTask = new AsyncTask<InputStream, String, String>() {
                        ProgressDialog mDialog = new ProgressDialog(NewsActivity.this);

                        @Override
                        protected String doInBackground(InputStream... params) {
                            try {
                                publishProgress("Recongnizing...");
                                String[] features = {"Description"};
                                String[] details = {};
                                AnalysisResult result = visionServiceClient.analyzeImage(params[0],features,details);
                                String strResult = new Gson().toJson(result);
                                return  strResult;
                            } catch (Exception e) {
                                return null;
                            }

                        }

                        @Override
                        protected void onPreExecute() {
                            mDialog.show();
                        }

                        @Override
                        protected void onPostExecute(String s) {
                            mDialog.dismiss();
                            AnalysisResult result = new Gson().fromJson(s,AnalysisResult.class);
                            TextView textView = (TextView) findViewById(R.id.txtDescription);
                            StringBuilder stringBuilder = new StringBuilder();
                            for (Caption caption:result.description.captions)
                            {
                                stringBuilder.append(caption.text);
                            }
                            textView.setText(stringBuilder);
                        }

                        @Override
                        protected void onProgressUpdate(String... values) {
                            mDialog.setMessage(values[0]);
                        }
                    };




                    visionTask.execute(inputStream);
                }
            });

           // Uri tempUri = getImageUri(getApplicationContext(), bitmap);
            //filePath = getPath(tempUri, getApplicationContext());
        }
    }




    public Uri getImageUri(Context inContext, Bitmap inImage) {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        //inImage.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
        String path = MediaStore.Images.Media.insertImage(inContext.getContentResolver(), inImage, "Title", null);
        return Uri.parse(path);
    }



    public static String getPath(Uri contentUri,Context ctx) {
        String[] proj = { MediaStore.Images.Media.DATA };
        CursorLoader loader = new CursorLoader(ctx, contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String result = cursor.getString(column_index);
        cursor.close();
        return result;
    }


}
