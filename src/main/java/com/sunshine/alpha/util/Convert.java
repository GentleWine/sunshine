package com.sunshine.alpha.util;

public class Convert {
    //字节数组转16进制字符串
    public static String byteArrayToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (int index = 0, len = bytes.length; index <= len - 1; index += 1) {
            int char1 = ((bytes[index] >> 4) & 0xF);
            char chara1 = Character.forDigit(char1, 16);
            int char2 = ((bytes[index]) & 0xF);
            char chara2 = Character.forDigit(char2, 16);
            result.append(chara1);
            result.append(chara2);
        }
        return result.toString();
    }


}
