export const productData = {
  "MM-PID-03": {
    "titleKey": "MM-PID-03 // PID_CONTROLLER",
    "descKey": "PID_DESC",
    "specs": [
      { key: "COMP_EQUIP", value: "PID_S1" },
      { key: "SENS_INP", value: "PID_S2" },
      { key: "MCU", value: "STM32F103C8T6" },
      { key: "COMM_PROT", value: "Modbus RTU / RS485" }
    ]
  },
  "MM-MIX-02": {
    "titleKey": "MM-MIX-02 // AC_MOTOR_CONTROLLER",
    "descKey": "MIX_DESC",
    "specs": [
      { key: "MOTOR_TYP", value: "AC Induction / BLDC" },
      { key: "CTRL_TECH", value: "MIX_S2" },
      { key: "SPEED_RNG", value: "MIX_S3" },
      { key: "SAFETY", value: "MIX_S4" }
    ]
  },
  "MM-LAM-01": {
    "titleKey": "MM-LAM-01 // LAMINAR_HOOD_CONTROLLER",
    "descKey": "LAM_DESC",
    "specs": [
      { key: "FAN_CTRL", value: "LAM_S1" },
      { key: "FILTR", value: "LAM_S2" },
      { key: "UI", value: "LAM_S3" },
      { key: "STD", value: "LAM_S4" }
    ]
  }
};
