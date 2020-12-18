package com.example.elle_iza;

import androidx.appcompat.app.AppCompatActivity;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v7.app.androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    iSound iS;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        View decorView = getWindow().getDecorView();
        //set the IMMERSIVE flag.
        //Set the content to appear under the systems bars so that the content
        //doesn't resize when the system bars hide and show.
        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE;
        decorView.setSystemUiVisibility(uiOptions);

        setContentView(R.layout.activity_main);
        iS = new iSound(getApplicationContext());

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        webView = (WebView)findViewById((R.id.webview1));
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/Elle_iza.html");

        webView.addJavascriptInterface(iS, "soundMgr");


    }

}