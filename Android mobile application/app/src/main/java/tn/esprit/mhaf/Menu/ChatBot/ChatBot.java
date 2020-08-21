package tn.esprit.mhaf.Menu.ChatBot;

import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.github.kittinunf.fuel.Fuel;
import com.github.kittinunf.fuel.core.FuelError;
import com.github.kittinunf.fuel.core.Handler;
import com.github.kittinunf.fuel.core.Request;
import com.github.kittinunf.fuel.core.Response;
import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
import com.ibm.watson.developer_cloud.http.ServiceCallback;


import java.util.Locale;

import tn.esprit.mhaf.R;

public class ChatBot extends AppCompatActivity {


    TextToSpeech t1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_bot);

        t1 = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {


                if (status!=TextToSpeech.ERROR)
                {
                    t1.setLanguage(Locale.US);
                }
            }
        });



        final ConversationService myConversationService =
                new ConversationService(
                        "2020-05-17",
                        getString(R.string.username),
                        getString(R.string.password)
                );


        final TextView conversation = (TextView)findViewById(R.id.conversation);
        final EditText userInput = (EditText)findViewById(R.id.user_input);
        final Button input_button = (Button)findViewById(R.id.input_button);



        input_button.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View v) {


                                                final String inputText = userInput.getText().toString();
                                                conversation.append(
                                                        Html.fromHtml("<p><b>You:</b> " + inputText + "</p>")
                                                );

// Optionally, clear edittext
                                                userInput.setText("");
                                                MessageRequest request = new MessageRequest.Builder()
                                                        .inputText(inputText)
                                                        .build();
                                                myConversationService
                                                        .message(getString(R.string.workspace), request)
                                                        .enqueue(new ServiceCallback<MessageResponse>() {
                                                            @Override
                                                            public void onResponse(MessageResponse response) {
                                                                final String outputText = response.getText().get(0);
                                                                runOnUiThread(new Runnable() {
                                                                    @Override
                                                                    public void run() {
                                                                        conversation.append(
                                                                                Html.fromHtml("<p><b> IRTL Bot:</b> " +
                                                                                        outputText + "</p>")
                                                                        );
                                                                        String toSpeak = outputText.toString();
                                                                        // Toast.makeText(getApplicationContext(),toSpeak,Toast.LENGTH_SHORT).show();
                                                                        t1.speak(toSpeak,TextToSpeech.QUEUE_FLUSH,null);
                                                                    }
                                                                });
                                                                if(response.getIntents().get(0).getIntent()
                                                                        .endsWith("Mhaf")) {
                                                                    String quotesURL =
                                                                            "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/499494c3-e078-43a9-a049-d7eae04d5287" +
                                                                                    "?method=getQuote&format=text&lang=en";

                                                                    Fuel.get(quotesURL)
                                                                            .responseString(new Handler<String>() {
                                                                                @Override
                                                                                public void success(Request request,
                                                                                                    Response response, String quote) {
                                                                                    conversation.append(
                                                                                            Html.fromHtml("<p><b> IRTL Bot:</b> " +
                                                                                                    quote + "</p>")
                                                                                    );
                                                                                }

                                                                                @Override
                                                                                public void failure(Request request,
                                                                                                    Response response,
                                                                                                    FuelError fuelError) {
                                                                                }
                                                                            });
                                                                }
                                                            }

                                                            @Override
                                                            public void onFailure(Exception e) {}
                                                        });


                                            }

                                        }
        );



    }

    @Override
    protected void onPause() {
        if (t1!=null)
        {
            t1.stop();
            t1.shutdown();
        }
        super.onPause();
    }

}
