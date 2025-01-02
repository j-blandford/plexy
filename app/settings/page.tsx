"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  // const router = useRouter();
  const settingsList = [
    {
      "name": "General",
      "options": [
        {
          "name": "Auto-skip Intro",
          "type": "checkbox",
          "location": "autoSkipIntro"
        },
        {
          "name": "Auto-skip Credits",
          "type": "checkbox",
          "location": "autoSkipCredits"
        }
      ]
    }
  ];

  let dirtySettings: { location: string; value: string; }[] = [];
  const [isDirty, setIsDirty] = useState(false);

  const setDirtySetting = async (settingName: string, value: any) => {
    //localStorage.setItem(name, value);

    console.log("set", settingName, value);

    for(let i = 0; i < dirtySettings.length; i++) {
      if(dirtySettings[i].location === settingName) {
        dirtySettings[i].value = value;
      }
    }
  }

  const getSetting = (name: string) => {
    const settingValue = localStorage.getItem(name);
    console.log(settingValue);
    return settingValue;
  }

  const getDirtySetting = (name: string) => {
    for (const setting of dirtySettings) {
      if(setting.location === name) {
        console.log("lol", setting.value);
        return setting.value;
      }
    }

    // default to settings
    return getSetting(name);
  }

  const saveSettings = () => {
    for (const setting of dirtySettings) {
      localStorage.setItem(setting.location, setting.value);
    }

    setIsDirty(false);
  }

  const setDirty = () => {
    console.log("dirty");
    setIsDirty(true);
  }

  const settingsElem: JSX.Element[] = [];

  for (const category of settingsList) {

    settingsElem.push(
      <p className="font-bold text-2xl pt-5" key={category.name}>{category.name}</p>
    )

    for (const setting of category.options) {
      const settingValue = getSetting(setting.location);
      dirtySettings.push({
        "location": setting.location,
        "value": settingValue ? settingValue : "false"
      });

      settingsElem.push(
        <div className="pt-1" key={setting.location}>
          <p>{setting.name}
            <input 
              type="checkbox"
              checked={getDirtySetting(setting.location) === "true"}
              onClick={setDirty}
              onChange={(value) => { setDirtySetting(setting.location, value.target.checked)}}
              key={"value-" + setting.location}
            ></input>
          </p>
        </div>
      );
    }
  }

  return <>
    <div className="w-full absolute top-16 ml-20 flex flex-col mr-20 pt-10">
      <div className="gap-2 pt-5">
        <p className="font-bold text-5xl">Settings</p>
      </div>

      {settingsElem}

      <div className="gap-2 pt-5">
        <Button 
          disabled={!isDirty}
          onClick={saveSettings}>
            Save Options
        </Button>
      </div>
    </div>
  </>;
}
