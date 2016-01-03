# docomment

[![Build Status](https://travis-ci.org/k--kato/docomment.svg?branch=master)](https://travis-ci.org/k--kato/docomment)
[![License: MIT](http://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

Generate XML documentation comments for Visual Studio Code (C# only).

## How to use

Type "///", it auto-generates an XML doucumentation comment like this:

```csharp
/// <summary>
/// 
/// </summary>
class Foo
{

    /// <summary>
    /// 
    /// </summary>
    /// <param name="s"></param>
    /// <param name="y"></param>
    /// <param name="z"></param>
    /// <returns></returns>
    public int bb(string s, ref int y, void * z)
    {
        return 1;
    }

}


```
