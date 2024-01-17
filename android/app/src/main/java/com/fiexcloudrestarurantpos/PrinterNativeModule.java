package com.finexcloudrestarurantpos; // replace com.your-app-name with your app’s name

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.finexcloudrestarurantpos.activity.InvoiceStyle;
import com.finexcloudrestarurantpos.activity.MainActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;


public class PrinterNativeModule extends ReactContextBaseJavaModule {
      private Context mContext;
    private final int REQUEST_ENABLE_BT = 101;
    public List<BluetoothDevice> pairedDeviceList, foundDeviceList;
    public BluetoothAdapter mBluetoothAdapter;
    private List<BluetoothDevice> mList;




    PrinterNativeModule(ReactApplicationContext context) {
       super(context);
         mContext=context;

   }
   @Override
public String getName() {
   return "PrinterNativeModule";

}

@ReactMethod
public void createPrinterNativeModule(String name) {
//    Log.d("CalendarModule", "Create event called with name: " + name
//    + " and location: " + location);
   //Toast.makeText(mContext ,name,Toast.LENGTH_SHORT).show();

    initData();
}



@ReactMethod(isBlockingSynchronousMethod = true)
public void initData() {
    Intent i = new Intent(mContext, MainActivity.class);
    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    mContext.startActivity(i);
//        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
//        pairedDeviceList = new ArrayList<>(mBluetoothAdapter.getBondedDevices());
//        if (pairedDeviceList.size() == 0) {
//            BluetoothDevice bluetoothDevice = pairedDeviceList.get(0);
//           // tvPairedDeviceEmpty.setVisibility(View.VISIBLE);
//            Log.d("initData", String.valueOf(bluetoothDevice.getName()));
//        };
//        Log.d("initData", String.valueOf(pairedDeviceList));
//        return String.valueOf(pairedDeviceList);
       }
    @ReactMethod
    public void printing(String obj, String uri, String arrays)  {
        Intent i = new Intent(mContext, InvoiceStyle.class);
        i.putExtra("Object",obj);
        i.putExtra("uri",uri);
        i.putExtra("arrays",arrays);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(i);
}



}


