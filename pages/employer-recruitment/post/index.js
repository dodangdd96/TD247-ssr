import { Component } from 'react';
import { InputNumber, Input, Button, Select, DatePicker } from 'antd';
import levera from 'hocs/whoami';
import { listWork, listPosition } from 'tools';
import ContainerLayout from 'layout/ContainerLayout';
import { fetchJobPost, updateJobPost, createJobPost, clearJob } from 'actions';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import Router from 'next/router';

const Option = Select.Option;
const { TextArea } = Input;

class Post extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch }, query } = ctx;
    if (query.jobId) {
      if (isServer) {
        await dispatch(fetchJobPost(accessToken, query.jobId ));
      } else {
        await dispatch(fetchJobPost(accessToken, query.jobId ));
      }
    } else {
      await dispatch(clearJob())
    }
    
  }
  constructor(props) {
    super(props);
    this.state ={
      currJobPost: props.job,
      type: props.job.id ? "update" : "create"
    }
  }

  static pageInfo = {
    title: 'Đăng tin tuyển dụng',
  };

  onHandleJobPost = (which, value) => {
    const { currJobPost } = this.state;
    let cloneJobPost = cloneDeep(currJobPost);
    cloneJobPost[which] = value;
    this.setState({ currJobPost: cloneJobPost });
  }

  onHadleCreatePost = () => {
    const { createJobPost, accessToken, user, updateJobPost } = this.props;
    const { currJobPost, type } = this.state;
    if (type == "create") {
      createJobPost(accessToken, this.state.currJobPost).then(res => {
        if(res) Router.push(`/employer-recruitment/saved?userId=${user.id}`)
      });
    } else {
      updateJobPost(accessToken, currJobPost)
    }
  }

  onChangeDate = (date, dateString) => {
    const { currJobPost } = this.state;
    let cloneJobPost = cloneDeep(currJobPost);
    cloneJobPost["period"] = date;
    this.setState({ currJobPost: cloneJobPost })
  }

  render() {
    const yearsOfExperience = ["Chưa có kinh nghiệm", "1 năm", "2 năm", "3 năm", "4 năm", "5 năm", "6 năm", "7 năm", "8 năm", "9 năm", "10 năm"];
    const academicLevel = ["Đại học", "Tất cả trình độ", "Lao động phổ thông Trung học", "Trung cấp", "Cao đẳng", "Kỹ sư", "Cử nhân", "Thạc sĩ", "Tiến sĩ", "Khác"];
    const salaryLevel = ["1 triệu - 2 triệu", "2 triệu - 4 triệu","4 triệu - 7 triệu","7 triệu - 10 triệu","10 triệu - 13 triệu","12-16 triệu","16-20 triệu","20-25 triệu","25-30 triệu","30-40 triệu","40-50 triệu"];
    const level = ["Mới tốt nghiệp / Thực tập sinh", "Nhân viên", "Trưởng nhóm", "Trưởng phòng", "Phó giám đốc", "Giám đốc", "Tổng giám đốc điều hành", "Khác"];
    const typeOfWork = ["Toàn thời gian cố định", "Toàn thời gian tạm thời", "Bán thời gian cố định", "Bán thời gian tạm thời", "Theo hợp đồng / tư vấn", "Thực tập", "Khác"];

    const { currJobPost } = this.state;
    return (
      <ContainerLayout>
        <div className="box" style={{ padding: "0px 10px 10px 20px", marginBottom: 20 }}>
        <div className="post-title">Thông tin công việc</div>
        <div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Chức danh:</div>
              <Input 
                placeholder={"VD: Nhân viên kinh doang,.."}
                onChange={e => this.onHandleJobPost('position', e.target.value)}
                value={currJobPost.position}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Mã số:</div>
              <Input
                placeholder={"Nhập mã số"}
                onChange={e => this.onHandleJobPost('index', e.target.value)}
                value={currJobPost.index}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Mức lương:</div>
                <Select
                  placeholder={"Chọn mức lương"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleJobPost('wage', e)}
                  value={currJobPost.wage}
                >
                  {salaryLevel.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Số lượng tuyển:</div>
              <InputNumber
                placeholder={"Nhập số lượng"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('number_of_recruitment', e)}
                value={currJobPost.number_of_recruitment}
              />
            </div>
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Cấp bậc:</div>
              <Select
                placeholder={"Chọn số năm"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('level', e)}
                value={currJobPost.level}
              >
                {level.map(item => 
                  <Option value={item}>{item}</Option>
                )}
              </Select>
            </div> 
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Loại hình công việc:</div>
              <Select
                placeholder={"Chọn địa điểm"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('type_of_work', e)}
                value={currJobPost.type_of_work}
              >
                {typeOfWork.map(item => 
                  <Option value={item}>{item}</Option>
                )}
              </Select>
            </div> 
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Địa điểm công việc:</div>
              <Select
                placeholder={"Chọn địa điểm"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('province', e)}
                value={currJobPost.province}
              >
                {listPosition.map(item => 
                  <Option value={item}>{item}</Option>
                )}
              </Select>
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Ngành nghề:</div>
              <Select 
                placeholder={"Chọn ngành nghề"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('career', e)}
                value={currJobPost.career}
              >
                {listWork.map(item => 
                  <Option value={item}>{item}</Option>
                )}
              </Select>
            </div>
          </div>
          <div className="input-element">
            <div className="title-element">Mô tả công việc:</div>
            <TextArea
              onChange={e => this.onHandleJobPost('description', e.target.value)}
              value={currJobPost.description}
            />
          </div>
          <div className="input-element">
            <div className="title-element">Quyền lợi được hưởng:</div>
            <TextArea
              onChange={e => this.onHandleJobPost('benefit', e.target.value)}
              value={currJobPost.benefit}
            />
          </div> 
        </div>
        <div className="post-title">Yêu cầu công việc</div>
        <div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ width: "33%" }}>
              <div className="title-element">Kinh nghiệm:</div>
                <Select
                  placeholder={"Chọn số năm"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleJobPost('experience', e)}
                  value={currJobPost.experience}
                >
                {yearsOfExperience.map(item => 
                  <Option value={item}>{item}</Option>
                )}
                </Select>
              </div> 
              <div className="input-element" style={{ width: "33%" }}>
                <div className="title-element">Bằng cấp:</div>
                  <Select
                    placeholder={"Chọn số năm"}
                    style={{ width: "100%" }}
                    onChange={e => this.onHandleJobPost('degree', e)}
                    value={currJobPost.degree}
                  >
                  {academicLevel.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                  </Select>
              </div> 
              <div className="input-element" style={{ width: "33%" }}>
                <div className="title-element">Giới tính:</div>
                  <Select
                    placeholder={"Chọn giới tính"}
                    style={{ width: "100%" }}
                    onChange={e => this.onHandleJobPost('sex', e)}
                    value={currJobPost.sex}
                  >
                    <Option value="Không yêu cầu">Không yêu cầu</Option>
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                  </Select>
              </div> 
            </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Thời hạn nộp hồ sơ:</div>
              <DatePicker
                format="DD/MM/YYYY"
                value={currJobPost.period ? moment(currJobPost.period) : undefined}
                placeholder="Chọn ngày" 
                style={{ width: "100%" }}
                onChange={this.onChangeDate}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Ngôn ngữ hồ sơ:</div>
              <Select 
                placeholder={"Chọn"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleJobPost('language', e)}
                value={currJobPost.language}
              >
                <Option value="Tiếng việt">Tiếng việt</Option>
                <Option value="Tiếng anh">Tiếng anh</Option>
                <Option value="Tiếng hàn">Tiếng hàn</Option>
                <Option value="Tiếng trung">Tiếng trung</Option>
              </Select>
            </div>
          </div>
          <div className="input-element">
            <div className="title-element">Yêu cầu công việc:</div>
            <TextArea
              onChange={e => this.onHandleJobPost('job_requirements', e.target.value)}
              value={currJobPost.job_requirements}
            />
          </div>
          <div className="input-element">
            <div className="title-element">Yêu cầu hồ sơ:</div>
            <TextArea
              onChange={e => this.onHandleJobPost('profile_required', e.target.value)}
              value={currJobPost.profile_required}
            />
          </div> 
        </div>
        <div className="post-title">Thông tin liên hệ</div>
        <div>
        <div className="input-element">
          <div className="title-element">Người liên hệ:</div>
            <Input 
              placeholder={"Nhập tên"}
              onChange={e => this.onHandleJobPost('contact', e.target.value)}
              value={currJobPost.contact}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Email liên hệ:</div>
              <Input 
                placeholder={"Nhập email"}
                onChange={e => this.onHandleJobPost('email_contact', e.target.value)}
                value={currJobPost.email_contact}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Số điện thoại liên hệ:</div>
              <Input
                placeholder={"Nhập SDT"}
                onChange={e => this.onHandleJobPost('phone_number_contact', e.target.value)}
                value={currJobPost.phone_number_contact}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 15, marginBottom: 15, display: 'flex', justifyContent: 'flex-end', marginRight: 10 }}>
          <Button type="primary" onClick={this.onHadleCreatePost}>Đăng tin tuyển dụng</Button>
        </div>
        </div>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = ({ user, jobs }) => ({
  user: user.user,
  accessToken: user.accessToken,
  job: jobs.job,
  clearJob
});

export default connect(mapStateToProps, { fetchJobPost, updateJobPost, createJobPost })(levera(Post));