import React from "react"
import { useHistory } from "react-router"
import Moment from "moment"
import { Button } from "@material-ui/core"
import { CheckBox, Delete } from "@material-ui/icons"

import { updatePosts, adminConfirmNewPost } from "../../../../apis"
import { AppConfig } from "../../../../Constants"

export default function PostDetail() {
  const history = useHistory()
  const { item } = history.location.state

  const updateToApprove = () => {
    if (item.status === AppConfig.PostsStatus.waitAdminApprovePost) {
      updatePosts(item.id, {
        status: AppConfig.PostsStatus.waitCustomerPayment,
        statusText: 'รอลูกค้าชำระเงิน',
        sys_update_date: new Date().toUTCString(),
      });
    //   navigation.navigate('Post-List-All');
    } else {
      adminConfirmNewPost(item)
        .then(res => {
          if (res) {
            // navigation.navigate('Post-List-All');
          }
        })
        .catch(err => alert(err));
    }
  };

  const updateNotApprove = () => {
    updatePosts(item.id, {
      status: AppConfig.PostsStatus.notApprove,
      statusText: 'ไม่อนุมัติโพสท์',
      sys_update_date: new Date().toUTCString(),
    });
    // navigation.navigate('Post-List-All');
  };

  return (
    <div style={{margin: 20}}>
      <div align="center">รายละเอียดโพสท์</div>
      <div align="center">( สถานะ {item.statusText} )</div>
      <hr />
      <div>
        <div>โหมดงาน: {item.partnerRequest}</div>
        <div>จำนวนน้องๆ ที่ต้องการ: {item.partnerWantQty} คน</div>
        <div>ชื่อลูกค้า: {item.customerName}</div>
        <div>Level: {item.customerLevel}</div>
        <div>จังหวัด: {item.provinceName}</div>
        <div>
          เวลาเริ่ม: {item.startTime}, เวลาเลิก: {item.stopTiem}
        </div>
        <hr />
        <div>สถานที่: {item.placeMeeting}</div>
        <div>เบอร์โทร: {item.customerPhone}</div>
        <div>รายละเอียดเพิ่มเติม: {item.customerRemark}</div>
        <hr />
        <div>
          วันที่สร้างข้อมูล{" "}
          {Moment(item.sys_create_date).format("DD/MM/YYYY HH:mm:ss")}
        </div>
        <div>
          วันที่อัพเดตข้อมูล{" "}
          {Moment(item.sys_update_date).format("DD/MM/YYYY HH:mm:ss")}
        </div>
      </div>
      <hr />
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 5 }}
          startIcon={<CheckBox />}
          onClick={updateToApprove}
        >
          อนุมัติโพสท์
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: 5 }}
          startIcon={<Delete />}
          onClick={updateNotApprove}
        >
          ไม่อนุมัติโพสท์
        </Button>
      </div>
    </div>
  )
}
