package tn.esprit.mhaf.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import tn.esprit.mhaf.Menu.Details.AccessListDetailsActivity;
import tn.esprit.mhaf.Models.AccessList;
import tn.esprit.mhaf.Models.Devices;
import tn.esprit.mhaf.R;


public class AccessListAdapter extends RecyclerView.Adapter<AccessListAdapter.AccessListViewHolder> {

    private Context mCtx;
    private List<AccessList> AccessList;

    public AccessListAdapter(Context mCtx, List<AccessList> AccessList) {
        this.mCtx = mCtx;
        this.AccessList = AccessList;
    }

    @Override
    public AccessListViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mCtx);
        View view = inflater.inflate(R.layout.access_list_row, null);
        return new AccessListViewHolder(view);
    }



    @Override
    public void onBindViewHolder(AccessListViewHolder holder, int position) {
        AccessList accessList = AccessList.get(position);
        holder.textViewaccessapplicationname.setText(accessList.getApplication_name());
        holder.textViewaccessapplicationdesc.setText(accessList.getDescription());
        holder.textViewaccesstype.setText(accessList.getAccesstype());

        holder.textViewaccessapplicationname.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {

                Intent myIntent = new Intent(mCtx, AccessListDetailsActivity.class);
                myIntent.putExtra("access_name", accessList.getApplication_name());
                myIntent.putExtra("access_desc", accessList.getDescription());
                myIntent.putExtra("access_type", accessList.getAccesstype());


                mCtx.startActivity(myIntent);
            }
        });

    }





    @Override
    public int getItemCount() {
        return AccessList.size();
    }

    class AccessListViewHolder extends RecyclerView.ViewHolder {

   TextView  textViewaccessapplicationname,textViewaccessapplicationdesc,textViewaccesstype;

        public AccessListViewHolder(View itemView) {
            super(itemView);

            textViewaccessapplicationname = itemView.findViewById(R.id.textViewaccessapplicationname);
            textViewaccessapplicationdesc = itemView.findViewById(R.id.textViewaccessapplicationdesc);
            textViewaccesstype = itemView.findViewById(R.id.textViewaccesstype);




        }
    }


}
