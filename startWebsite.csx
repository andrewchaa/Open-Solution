#load common\Shell.csx
#load common\Application.csx

using System;
using System.IO;

var websiteProcessName = "GSA.ECM.Ultra.Website";
var websiteDir = Path.GetFullPath("../src/" + websiteProcessName);

var serviceProcessName = "GSA.ECM.Ultra.Microservice";
var serviceDir = Path.GetFullPath("../src/" + serviceProcessName);

var website = new Application(websiteProcessName, websiteDir);
website.Shutdown();
website.Compile();
website.Start();

var service = new Application(serviceProcessName, serviceDir);
service.Shutdown();
service.Compile();
service.Start();

while(Console.ReadKey().Key != ConsoleKey.Q)
{
    website.Shutdown();
    service.Shutdown();

    website.CompileAndStart();
    service.CompileAndStart();

    while(Console.KeyAvailable)
    {
        Console.ReadKey(false);
    }
}


service.Shutdown();
website.Shutdown();
Shell.ExecuteCommand("taskkill","/IM node.exe /F");
