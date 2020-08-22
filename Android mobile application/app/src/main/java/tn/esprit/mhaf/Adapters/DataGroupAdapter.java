package tn.esprit.mhaf.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import tn.esprit.mhaf.Menu.Details.DataGroupDetailsActivity;
import tn.esprit.mhaf.Models.DataGroup;
import tn.esprit.mhaf.Models.Datatype;
import tn.esprit.mhaf.R;



public class DataGroupAdapter extends RecyclerView.Adapter<DataGroupAdapter.DataGroupViewHolder> {


    private Context mCtx;
    private List<DataGroup> DataGroupList;

    public DataGroupAdapter(Context mCtx, List<DataGroup> datagroupList) {
        this.mCtx = mCtx;
        this.DataGroupList = datagroupList;
    }

    @Override
    public DataGroupViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mCtx);
        View view = inflater.inflate(R.layout.datagroup_list_row, null);
        return new DataGroupViewHolder(view);
    }

    @Override
    public void onBindViewHolder(DataGroupViewHolder holder, int position) {
        DataGroup dataGroup = DataGroupList.get(position);
        holder.textViewdatagroupname.setText(dataGroup.getName());
        holder.textViewdatagroupdesc.setText(dataGroup.getDescription());
        holder.textViewdatagroupaction.setText(dataGroup.getAction());
        holder.textViewdatagroupdatatype.setText(dataGroup.getDatatype_name());

        holder.textViewdatagroupname.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {

                Intent myIntent = new Intent(mCtx, DataGroupDetailsActivity.class);
                myIntent.putExtra("datagroup_name", dataGroup.getName());
                myIntent.putExtra("datagroup_desc", dataGroup.getDescription());
                myIntent.putExtra("datagroup_action", dataGroup.getAction());
                myIntent.putExtra("datagroup_dataname_name", dataGroup.getDatatype_name());
                mCtx.startActivity(myIntent);
            }
        });
    }

    /*
    *     private String data_type_name;
    private String data_type_unit;
    private String data_type_type;

    *
    * */

    @Override
    public int getItemCount() {
        return DataGroupList.size();
    }

    class DataGroupViewHolder extends RecyclerView.ViewHolder {

        TextView textViewdatagroupname, textViewdatagroupdesc,textViewdatagroupaction,textViewdatagroupdatatype;


        public DataGroupViewHolder(View itemView) {
            super(itemView);

            textViewdatagroupname = itemView.findViewById(R.id.textViewdatagroupname);
            textViewdatagroupdesc = itemView.findViewById(R.id.textViewdatagroupdesc);
            textViewdatagroupaction = itemView.findViewById(R.id.textViewdatagroupaction);
            textViewdatagroupdatatype = itemView.findViewById(R.id.textViewdatagroupdatatype);

        }
    }



}
