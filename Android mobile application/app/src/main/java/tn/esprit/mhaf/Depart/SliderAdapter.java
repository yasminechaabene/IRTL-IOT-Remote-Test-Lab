package tn.esprit.mhaf.Depart;

import android.content.Context;
import android.support.v4.view.PagerAdapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import tn.esprit.mhaf.R;

public class SliderAdapter extends PagerAdapter
{


    Context context;
    LayoutInflater layoutInflater;
public SliderAdapter(Context context){
    this.context = context;
}
//Arrays
public int[] slide_images = {
        R.drawable.imgiotgraphics,
        R.drawable.stt,
        R.drawable.sv
        };


    public String[] slide_heading = {
            "Internet Of Things",
            "IOT",
            "IRTL Platform"
    };



    public String[] slide_description = {
    " THE INTERNET OF THINGS IS ABOUT EMPOWERING COMPUTERS.."+
    "SO THEY CAN SEE , HEAR AND SMELL THE WOLD FOR THEMSELVES",
    "If you think that the internet has changed your life, think again"+ " IRTL is about to change it all over again!",
   "IRTL platform  simplifies the interconnection of all your devices "+
   "collect and exchange the huge amount of data from the different devices and turn them into actionable insights and  meanful services"+
   "you will not only be able to just collect data .  it will be analyzed ! "
    };


    @Override
    public int getCount() {
        return slide_heading.length;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == (RelativeLayout)  object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
     layoutInflater = ( LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
        View view = layoutInflater.inflate(R.layout.slide_details_layout,container,false);
        ImageView slideImageView = ( ImageView) view.findViewById(R.id.SlideimageView);
        TextView slideheading = ( TextView) view.findViewById(R.id.slide_heading);
        TextView slideDesc = ( TextView) view.findViewById(R.id.slide_description);

        slideImageView.setImageResource(slide_images[position]);
        slideheading.setText(slide_heading[position]);
        slideDesc.setText(slide_description[position]);
        container.addView(view);


        return view;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((RelativeLayout)object);
    }
}
