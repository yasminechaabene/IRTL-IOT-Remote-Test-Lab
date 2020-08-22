package tn.esprit.mhaf.Adapters;
import tn.esprit.mhaf.Menu.Details.DataTypeDetailsActivity;
import tn.esprit.mhaf.Models.Datatype;
import tn.esprit.mhaf.R;
import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;



public class DataTypeAdapter extends RecyclerView.Adapter<DataTypeAdapter.DataTypeViewHolder> {

    LinearLayout displaydatatype;
    private Context mCtx;
    private List<Datatype> DatatypeList;

    public DataTypeAdapter(Context mCtx, List<Datatype> datatypeList) {
        this.mCtx = mCtx;
        this.DatatypeList = datatypeList;
    }

    @Override
    public DataTypeViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mCtx);
        View view = inflater.inflate(R.layout.datatype_list_row, null);




        return new DataTypeViewHolder(view);

    }

    @Override
    public void onBindViewHolder(DataTypeViewHolder holder, int position) {
        Datatype datatype = DatatypeList.get(position);

        holder.data_type_name.setText(datatype.getData_type_name());
        holder.data_type_unit.setText(datatype.getData_type_unit());
        holder.data_type_type.setText(datatype.getData_type_type());


// Exemple static
        /*holder.data_type_name.setText("data name");
        holder.data_type_unit.setText(" data unit");
        holder.data_type_type.setText("data type");
*/

        holder.data_type_name.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {

                Intent myIntent = new Intent(mCtx, DataTypeDetailsActivity.class);

                myIntent.putExtra("datatype_name", datatype.getData_type_name());
                myIntent.putExtra("datatype_unit", datatype.getData_type_unit());
                myIntent.putExtra("datatype_type", datatype.getData_type_type());

              /*  Toast.makeText(mCtx, "details : name"+datatype.getData_type_name()+
                "unit:"+datatype.getData_type_unit()+"type"+datatype.getData_type_type(), Toast.LENGTH_SHORT).show();*/

                System.out.println( "details : name"+datatype.getData_type_name()+
                        "unit:"+datatype.getData_type_unit()+"type"+datatype.getData_type_type());
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
        return DatatypeList.size();
    }

    class DataTypeViewHolder extends RecyclerView.ViewHolder {

        TextView data_type_name, data_type_unit, data_type_type;


        public DataTypeViewHolder(View itemView) {
            super(itemView);

            data_type_name = itemView.findViewById(R.id.textViewdatatypename);
            data_type_unit = itemView.findViewById(R.id.textViewdatatypeunit);
            data_type_type = itemView.findViewById(R.id.textViewdatatypetype);



        }
    }



}
