package tn.esprit.mhaf.Depart;



        import android.content.Intent;
        import android.os.Handler;
        import android.provider.ContactsContract;
        import android.support.v7.app.AppCompatActivity;
        import android.os.Bundle;
        import android.view.animation.Animation;
        import android.view.animation.AnimationUtils;
        import android.widget.ImageView;

        import tn.esprit.mhaf.Menu.HomeDashboard;
        import tn.esprit.mhaf.R;


public class SplashScreen extends AppCompatActivity {
    private static int SPLASH_TIME_OUT = 5000;
    ImageView imageView;
    Animation animation;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

      imageView = (ImageView) findViewById(R.id.logosplash);
        animation = (Animation) AnimationUtils.loadAnimation(getApplicationContext(),R.anim.fade);
        imageView.startAnimation(animation);



        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                Intent i = new Intent(SplashScreen.this,SlideActivity.class);
                startActivity(i);
                finish();
            }
        },SPLASH_TIME_OUT);

    }



}
