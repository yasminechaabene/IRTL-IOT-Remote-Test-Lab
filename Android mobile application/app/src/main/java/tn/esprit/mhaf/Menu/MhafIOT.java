package tn.esprit.mhaf.Menu;

import android.content.Intent;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.VideoView;

import tn.esprit.mhaf.Depart.LoginActivity;
import tn.esprit.mhaf.R;

public class MhafIOT extends AppCompatActivity {
Button clicklogout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mhaf_iot);

        Button buttonPlayVideo2 = (Button)findViewById(R.id.button1);
        clicklogout = (Button) findViewById(R.id.clicklogout);
        getWindow().setFormat(PixelFormat.UNKNOWN);
//displays a video file
        VideoView mVideoView2 = (VideoView)findViewById(R.id.videoView);
        String uriPath2 = "android.resource://tn.esprit.mhaf/"+R.raw.prom;
        Uri uri2 = Uri.parse(uriPath2);
        mVideoView2.setVideoURI(uri2);
        mVideoView2.requestFocus();
        mVideoView2.start();
        buttonPlayVideo2.setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                VideoView mVideoView2 = (VideoView) findViewById(R.id.videoView);
// VideoView mVideoView = new VideoView(this);
                String uriPath = "android.resource://tn.esprit.mhaf/" + R.raw.prom;
                Uri uri2 = Uri.parse(uriPath);
                mVideoView2.setVideoURI(uri2);
                mVideoView2.requestFocus();
                mVideoView2.start();
            }
        });



        clicklogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MhafIOT.this,LoginActivity.class);
                startActivity(i);
            }
        });
    }
}
