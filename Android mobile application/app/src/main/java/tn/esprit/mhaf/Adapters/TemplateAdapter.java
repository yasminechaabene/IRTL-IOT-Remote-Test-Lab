package tn.esprit.mhaf.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import tn.esprit.mhaf.Menu.Details.TemplateDetailsActivity;
import tn.esprit.mhaf.Models.DataGroup;
import tn.esprit.mhaf.Models.Template;
import tn.esprit.mhaf.R;



public class TemplateAdapter extends RecyclerView.Adapter<TemplateAdapter.TemplateViewHolder> {

    private Context mCtx;
    private List<Template> TemplateList;

    public TemplateAdapter(Context mCtx, List<Template> TemplateList) {
        this.mCtx = mCtx;
        this.TemplateList = TemplateList;
    }

    @Override
    public TemplateViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mCtx);
        View view = inflater.inflate(R.layout.template_list_row, null);
        return new TemplateViewHolder(view);
    }

    @Override
    public void onBindViewHolder(TemplateViewHolder holder, int position) {
        Template template = TemplateList.get(position);
        holder.textViewtemplatename.setText(template.getName());
        holder.textViewtemplatelocation.setText(template.getLocation());
        holder.textViewtempdatagroup_name.setText(template.getDatagroup_name());


        holder.textViewtemplatename.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {

                Intent myIntent = new Intent(mCtx, TemplateDetailsActivity.class);
                myIntent.putExtra("template_name", template.getName());
                myIntent.putExtra("template_location", template.getLocation());
                myIntent.putExtra("template_datagroup_name", template.getDatagroup_name());

                mCtx.startActivity(myIntent);
            }
        });

    }



    @Override
    public int getItemCount() {
        return TemplateList.size();
    }

    class TemplateViewHolder extends RecyclerView.ViewHolder {

        TextView textViewtemplatename, textViewtemplatelocation,textViewtempdatagroup_name;


        public TemplateViewHolder(View itemView) {
            super(itemView);

            textViewtemplatename = itemView.findViewById(R.id.textViewtemplatename);
            textViewtemplatelocation = itemView.findViewById(R.id.textViewtemplatelocation);
            textViewtempdatagroup_name = itemView.findViewById(R.id.textViewtempdatagroup_name);


        }
    }



}
