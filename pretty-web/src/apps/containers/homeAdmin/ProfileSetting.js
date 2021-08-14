import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import SaveIcon from "@material-ui/icons/Save"
import { Person, LockOpen } from "@material-ui/icons"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "80%"
  }
}))

export default function InputWithIcon() {
  const classes = useStyles()

  return (
    <div align="center" style={{ margin: 10, border: '3px solid #eee' }}>
      <div
        style={{
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: 'underline'
        }}
      >
        เปลี่ยนรหัสผ่าน
      </div>
      <FormControl style={{ margin: 10, alignContent: 'center' }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          ชื่อผู้ใช้งาน
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl style={{ margin: 10 }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          ข้อมูลรหัสผ่านเดิมที่ใช้งาน
        </InputLabel>
        <Input
          type="password"
          startAdornment={
            <InputAdornment position="start">
              <LockOpen />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl style={{ margin: 10 }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          ข้อมูลรหัสผ่านใหม่
        </InputLabel>
        <Input
          type="password"
          startAdornment={
            <InputAdornment position="start">
              <LockOpen />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl style={{ margin: 10 }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          ข้อมูลยืนยันรหัสผ่านใหม่
        </InputLabel>
        <Input
          type="password"
          startAdornment={
            <InputAdornment position="start">
              <LockOpen />
            </InputAdornment>
          }
        />
      </FormControl>
      <div style={{ margin: 10 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          บันทึกข้อมูล
        </Button>
      </div>
    </div>
  )
}
