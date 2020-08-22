package tn.esprit.mhaf.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import tn.esprit.mhaf.Menu.Details.ConnectedDevicesDetailsActivity;
import tn.esprit.mhaf.Menu.Details.DevicesDetailsActivity;
import tn.esprit.mhaf.Models.Devices;
import tn.esprit.mhaf.Models.Template;
import tn.esprit.mhaf.R;


public class DevicesAdapter extends RecyclerView.Adapter<DevicesAdapter.DevicesViewHolder> {

    private Context mCtx;
    private List<Devices> DevicesList;

    public DevicesAdapter(Context mCtx, List<Devices> DevicesList) {
        this.mCtx = mCtx;
        this.DevicesList = DevicesList;
    }

    @Override
    public DevicesViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mCtx);
        View view = inflater.inflate(R.layout.devices_list_row, null);
        return new DevicesViewHolder(view);
    }



    @Override
    public void onBindViewHolder(DevicesViewHolder holder, int position) {
        Devices devices = DevicesList.get(position);
        holder.textViewdevicename.setText(devices.getName());
        holder.textViewdevicedesc.setText(devices.getDescription());

        holder.textViewdevicename.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {

                Intent myIntent = new Intent(mCtx, DevicesDetailsActivity.class);
                myIntent.putExtra("device_name", devices.getName());
                myIntent.putExtra("device_description", devices.getDescription());
                mCtx.startActivity(myIntent);

            }
        });


    }

    @Override
    public int getItemCount() {
        return DevicesList.size();
    }

    class DevicesViewHolder extends RecyclerView.ViewHolder {

        TextView textViewdevicename,textViewdevicedesc;


        public DevicesViewHolder(View itemView) {
            super(itemView);

            textViewdevicename = itemView.findViewById(R.id.textViewdevicename);

            textViewdevicedesc = itemView.findViewById(R.id.textViewdevicedesc);




        }
    }



}
