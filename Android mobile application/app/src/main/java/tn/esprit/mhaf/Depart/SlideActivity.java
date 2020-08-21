package tn.esprit.mhaf.Depart;

import android.content.Intent;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class SlideActivity extends AppCompatActivity {

    private ViewPager slideviewPager;
    private LinearLayout dotslayout;
    private  SliderAdapter sliderAdapter;

    private TextView[] mDots;
    private Button prev_btn;
    private  Button next_btn;
    private  int mCurrentPage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide);

        slideviewPager = (ViewPager)findViewById(R.id.slideviewPager);
        dotslayout = (LinearLayout)findViewById(R.id.dotslayout);

        prev_btn = (Button)findViewById(R.id.prev_btn);
        next_btn = (Button)findViewById(R.id.next_btn);

        sliderAdapter = new SliderAdapter(this);
        slideviewPager.setAdapter(sliderAdapter);
        addDotsIndicator(0);
        slideviewPager.addOnPageChangeListener(viewListener);




            next_btn.setOnClickListener(new View.OnClickListener(){

                @Override
                public void onClick(View v) {
                    slideviewPager.setCurrentItem(mCurrentPage +1);
                    if (next_btn.getText().equals("FINISH"))
                    {

                    Intent i = new Intent(SlideActivity.this,LoginActivity.class);
                    startActivity(i);
                    finish();
                }
                }
            });


        prev_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                slideviewPager.setCurrentItem(mCurrentPage - 1);
            }
        });
    }

    public void addDotsIndicator(int position) {
        mDots = new TextView[3];
        dotslayout.removeAllViews();
        for (int i = 0; i < mDots.length; i++) {
            mDots[i] = new TextView(this);
            mDots[i].setText(Html.fromHtml("&#8226"));
            mDots[i].setTextSize(35);
            mDots[i].setTextColor(getResources().getColor(R.color.colorTransparentWhite));

            dotslayout.addView(mDots[i]);


        }

        if (mDots.length > 0) {
            mDots[position].setTextColor(getResources().getColor(R.color.colorWhite));
        }




    }


    ViewPager.OnPageChangeListener viewListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

        }

        @Override
        public void onPageSelected(int i) {
            addDotsIndicator(i);
            mCurrentPage = i;
            if (i==0){
             next_btn.setEnabled(true);
                prev_btn.setEnabled(false);
                prev_btn.setVisibility(View.INVISIBLE);
                next_btn.setText("NEXT");
                prev_btn.setText("");
            }
            else if (i==mDots.length -1)
            {
                next_btn.setEnabled(true);
                prev_btn.setEnabled(true);
                prev_btn.setVisibility(View.VISIBLE);
                next_btn.setText("FINISH");
                prev_btn.setText("BACK");
            }else {
                next_btn.setEnabled(true);
                prev_btn.setEnabled(true);
                prev_btn.setVisibility(View.VISIBLE);
                next_btn.setText("NEXT");
                prev_btn.setText("BACK");
            }
        }

        @Override
        public void onPageScrollStateChanged(int state) {

        }
    };
}
