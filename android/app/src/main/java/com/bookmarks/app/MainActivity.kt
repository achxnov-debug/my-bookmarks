package com.bookmarks.app

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)

        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // Exact mobile viewport matching device display pixels
        settings.useWideViewPort = false
        settings.loadWithOverviewMode = false
        settings.displayZoomControls = false
        settings.builtInZoomControls = false
        settings.setSupportZoom(false)
        settings.textZoom = 100
        settings.setSupportMultipleWindows(false)
        settings.allowFileAccessFromFileURLs = true
        settings.allowUniversalAccessFromFileURLs = true

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                return openExternalUrl(url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                url ?: return false
                return openExternalUrl(url)
            }

            private fun openExternalUrl(url: String): Boolean {
                // Keep local app assets inside the WebView
                if (url.startsWith("file:///android_asset/") || url.startsWith("file://android_asset/")) {
                    return false
                }
                
                // Open any external web links (http, https, intent) in system browser or native apps
                return try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    startActivity(intent)
                    true
                } catch (e: Exception) {
                    false
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            // Optional chrome client customizations
        }

        // Load bundled standalone offline web app
        webView.loadUrl("file:///android_asset/index.html")

        // Handle Android Back Navigation
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })

        // Handle "Share" intent from other apps (Instagram, TikTok, YouTube, X, Threads)
        handleSendIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        intent?.let { handleSendIntent(it) }
    }

    private fun handleSendIntent(intent: Intent) {
        if (intent.action == Intent.ACTION_SEND && intent.type == "text/plain") {
            val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
            sharedText?.let { url ->
                // Inject URL into web app input
                val script = "javascript:(function(){" +
                        "const input = document.querySelector('input[type=\"url\"]');" +
                        "if(input){ input.value = '$url'; input.dispatchEvent(new Event('input', {bubbles:true})); }" +
                        "})()"
                webView.postDelayed({ webView.evaluateJavascript(script, null) }, 1000)
            }
        }
    }
}
