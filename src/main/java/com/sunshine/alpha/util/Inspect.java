package com.sunshine.alpha.util;

public class Inspect {
    //返回字符串中大小写字母的数目
    public static int[] lettercheck(String s)
    {
        int low = 0;
        int up = 0;
        int [] result = new int[2];
        for (char c : s.toCharArray())
        {
            if (c>=97 && c<=122) low++;
            if (c>=65 && c<=90)  up++;
        }
        result[0] = low;
        result[1] = up;
        return result;
    }

}
