export const command = () => {
  interface Command {
    execute: () => void;
  }

  class Light {
    on() {
      console.log("Light is on");
    }

    off() {
      console.log("Light is off");
    }
  }

  class GarageDoor {
    up() {
      console.log("Garage door is uped");
    }

    down() {
      console.log("Garage door is downed");
    }

    stop() {
      console.log("Garage door is stopped");
    }

    lightOn() {
      console.log("Garage door light is on");
    }
  }

  class LightOnCommand implements Command {
    light: Light;

    constructor(light: Light) {
      this.light = light;
    }

    execute() {
      this.light.on();
    }
  }

  class LightOffCommand implements Command {
    light: Light;

    constructor(light: Light) {
      this.light = light;
    }

    execute() {
      this.light.off();
    }
  }

  class OpenGarageDoorCommand implements Command {
    garageDoor: GarageDoor;

    constructor(garageDoor: GarageDoor) {
      this.garageDoor = garageDoor;
    }

    execute() {
      this.garageDoor.up();
    }
  }

  class CloseGarageDoorCommand implements Command {
    garageDoor: GarageDoor;

    constructor(garageDoor: GarageDoor) {
      this.garageDoor = garageDoor;
    }

    execute() {
      this.garageDoor.down();
    }
  }

  class MacroCommand implements Command {
    commands: Command[] = [];

    constructor(commands: Command[]) {
      this.commands = commands;
    }

    execute() {
      this.commands.forEach((c) => c.execute());
    }
  }

  type RemoteControlCommandName = "garageDoor" | "light" | "allHouseDevices";

  type RemoteControlCommands = {
    onCommand: Command;
    offCommand: Command;
  };

  type RemoteControlCommandsMap = {
    [name in RemoteControlCommandName]?: RemoteControlCommands;
  };

  class RemoteControl {
    commands: RemoteControlCommandsMap = {};

    setCommand(name: RemoteControlCommandName, commands: RemoteControlCommands) {
      this.commands[name] = {
        ...commands,
      };
    }

    turnOn(commandName: RemoteControlCommandName) {
      this.commands[commandName]?.onCommand.execute();
    }

    turnOff(commandName: RemoteControlCommandName) {
      this.commands[commandName]?.offCommand.execute();
    }
  }

  const remoteControl = new RemoteControl();

  const lightSystem = new Light();
  const lightOnCommand = new LightOnCommand(lightSystem);
  const lightOffCommand = new LightOffCommand(lightSystem);

  const garageDoor = new GarageDoor();
  const openGarageDoorCommand = new OpenGarageDoorCommand(garageDoor);
  const closeGarageDoorCommand = new CloseGarageDoorCommand(garageDoor);

  const turnOnEverything = new MacroCommand([lightOnCommand, openGarageDoorCommand]);
  const turnOffEverything = new MacroCommand([lightOffCommand, closeGarageDoorCommand]);

  remoteControl.setCommand("light", {
    onCommand: lightOnCommand,
    offCommand: lightOffCommand,
  });

  remoteControl.setCommand("garageDoor", {
    onCommand: openGarageDoorCommand,
    offCommand: closeGarageDoorCommand,
  });

  remoteControl.setCommand("allHouseDevices", {
    onCommand: turnOnEverything,
    offCommand: turnOffEverything,
  });

  remoteControl.turnOn("light");
  remoteControl.turnOn("garageDoor");

  remoteControl.turnOff("light");
  remoteControl.turnOff("garageDoor");

  remoteControl.turnOn("allHouseDevices");
  remoteControl.turnOff("allHouseDevices");
};
