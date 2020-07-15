import { Component } from 'react';
import { Select, Input, Button, DatePicker, Steps, Radio, Col, Row, Checkbox } from 'antd';
import levera from 'hocs/whoami';
import { listWork, listPosition } from 'tools';
import ContainerLayout from 'layout/ContainerLayout';
import { LeftOutlined, SafetyOutlined } from '@ant-design/icons';
import { fetchFileByUser, updateFile } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';

const Option = Select.Option;
const { TextArea } = Input;
const { Step } = Steps;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class File extends Component {
  static async getInitialProps(ctx, accessToken) {
    let { isServer, store: { dispatch }, query } = ctx;
    if (isServer) {
      await dispatch(fetchFileByUser(accessToken, query.userId));
    } else {
      await dispatch(fetchFileByUser(accessToken, query.userId));
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      current: 0,
      files: props.file || {}
    }
  }

  static pageInfo = {
    title: 'Quản lý hồ sơ',
  };

  nextStep() {
    const { updateFile, accessToken } = this.props;
    const { files } = this.state;
    updateFile(accessToken, files)
    if (this.state.current < 4) {
      const current = this.state.current + 1;
      this.setState({ current });
    }
  }

  prevStep() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  steps = [
    {
      title: 'Thông tin cá nhân',
      content: () => this.personalInfomation(),
    },
    {
      title: 'Thông tin hồ sơ',
      content: () => this.profileInfomation(),
    },
    {
      title: 'Học vấn bằng cấp',
      content: () => this.academicDegree(),
    },
    {
      title: 'Kinh nghiệm làm việc',
      content: () => this.workExperience(),
    },
    {
      title: 'Kỹ năng',
      content: () => this.skill(),
    },
  ];

  onHandleChangeFiles = (which, value) => {
    const { files } = this.state;
    files[which] = value;
    this.setState({ files })
  }

  onChangeDate = (date, dateString, which) => {
    const { files } = this.state;
    files[which] = date
    this.setState({ files })
  }

  personalInfomation = () => {
    const { files } = this.state;
    console.log(files)
    return (
      <div>
        <div className="title">Thông tin cá nhân</div>
        <div style={{ marginTop: 15, padding: 10 }}>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Họ và tên:</div>
              <Input
                placeholder={"Nhập họ tên"}
                onChange={e => this.onHandleChangeFiles('full_name', e.target.value)}
                value={files.full_name}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Số điện thoại:</div>
              <Input
                placeholder={"Nhập số điện thoại"}
                onChange={e => this.onHandleChangeFiles('phone_number', e.target.value)}
                value={files.phone_number}
              />
            </div>
          </div>
          <div style={{ display: 'flex' }} >
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Email:</div>
              <Input 
                placeholder={"Nhập email"}
                onChange={e => this.onHandleChangeFiles('email', e.target.value)}
                value={files.email}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Ngày sinh:</div>
              <DatePicker 
                placeholder="Chọn ngày sinh" 
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                value={files.date_of_birth ? moment(files.date_of_birth) : undefined}
                onChange={(date, dateString) => this.onChangeDate(date, dateString, "date_of_birth")}
                disabledDate={current => current && current > moment().endOf('day')}
                defaultPickerValue={moment().add(-25, 'years')}
              />
            </div>
          </div>
          <div className="input-element">
            <div className="title-element">Địa chỉ:</div>
            <Input
              placeholder={"Nhập địa chỉ"}
              onChange={e => this.onHandleChangeFiles('address', e.target.value)}
              value={files.address}
            />
          </div>
          <div style={{ padding: '10px 0px'}}>
            <span style={{ marginRight: 10, fontWeight: 500 }}>Giới tính:</span>
            <RadioGroup
             value={files.sex}
             onChange={e => this.onHandleChangeFiles('sex', e.target.value)}
             >
              <Radio value={"Nam"}>
                Nam
              </Radio>
              <Radio value={"Nữ"}>
                Nữ
              </Radio>
              <Radio value={"Khác"}>
                Khác
              </Radio>
            </RadioGroup>
          </div>
          <div>
            <span style={{ marginRight: 10, fontWeight: 500 }}>Tình trạng hôn nhân:</span>
            <RadioGroup
              value={files.marital_status}
              onChange={e => this.onHandleChangeFiles('marital_status', e.target.value)} 
            >
              <Radio value={"Độc thân"}>
                Độc thân
              </Radio>
              <Radio value={"Kết hôn"}>
                Kết hôn
              </Radio>
            </RadioGroup>
          </div> 
        </div>
      </div>
    )
  }

  profileInfomation = () => {
    const { files } = this.state;
    console.log(files.career)
    const yearsOfExperience = ["Chưa có kinh nghiệm", "1 năm", "2 năm", "3 năm", "4 năm", "5 năm", "6 năm", "7 năm", "8 năm", "9 năm", "10 năm"];
    const level = ["Mới tốt nghiệp / Thực tập sinh", "Nhân viên", "Trưởng nhóm", "Trưởng phòng", "Phó giám đốc", "Giám đốc", "Tổng giám đốc điều hành", "Khác"];
    const salaryLevel = ["1 triệu", "2 triệu","3 triệu","4 triệu","5 triệu","6 triệu","7 triệu","8 triệu","9 triệu","10 triệu","11 triệu","12 triệu","13 triệu","14 triệu","15 triệu"];
    const academicLevel = ["Lao động phổ thông Trung học", "Trung cấp", "Cao đẳng", "Kỹ sư", "Cử nhân", "Thạc sĩ", "Tiến sĩ", "Khác"];
    const typeOfWork = ["Toàn thời gian cố định", "Toàn thời gian tạm thời", "Bán thời gian cố định", "Bán thời gian tạm thời", "Theo hợp đồng / tư vấn", "Thực tập", "Khác"];
    const salary = ["1-3 triệu", "3-5 triệu","5-7 triệu","7-10 triệu","10-12 triệu","12-15 triệu","15-20 triệu","20-25 triệu","25-30 triệu","Khác"];
    return (
      <div>
        <div className="title">Thông tin hồ sơ</div>
        <div style={{ marginTop: 15, padding: 10 }}>
          <Row>
            <Col span={12}>
              <div className="input-element">
                <div className="title-element">Vị trí/việc làm cần ứng tuyển:</div>
                <Input 
                  placeholder={"Nhập vị trí"}
                  onChange={e => this.onHandleChangeFiles('position', e.target.value)}
                  value={files.position || undefined}
                />
              </div>
              <div className="input-element">
                <div className="title-element">Số năm kinh nghiệm:</div>
                  <Select
                    placeholder={"Chọn số năm"} 
                    style={{ width: "100%" }}
                    onChange={e => this.onHandleChangeFiles('years_of_experience', e)}
                    value={files.years_of_experience || undefined}
                  >
                    {yearsOfExperience.map(item => 
                      <Option value={item}>{item}</Option>
                    )}
                  </Select>
              </div> 
              <div className="input-element">
                <div className="title-element">Nghành nghề:</div>
                <Select
                  placeholder={"Chọn ngành nghề"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('career', e)}
                  value={files.career || undefined}
                >
                  {listWork.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div> 
              <div className="input-element">
                <div className="title-element">Cấp bậc:</div>
                <Select
                  placeholder={"Chọn cấp bậc"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('level', e)}
                  value={files.level || undefined}
                >
                {level.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div className="input-element">
                <div className="title-element">Mức lương tối thiểu:</div>
                <Select
                  placeholder={"Chọn mức lương"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('minimum_wage', e)}
                  value={files.minimum_wage || undefined}
                >
                  {salaryLevel.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div>
                <div style={{ fontWeight: 500, marginBottom: 5 }}>Mục tiêu nghề nghiệp:</div>
                <div>
                  <CheckboxGroup
                    style={{ display: 'grid' }}
                    onChange={e => this.onHandleChangeFiles('career_goals', e)}
                    value={files.career_goals}
                  >
                    <Checkbox style={{ marginLeft: 8 }} value="0">Mong muốn tìm được nơi làm việc lâu dài</Checkbox>
                    <Checkbox value="1">Mong muốn tìm được nơi làm việc có cơ hội thăng tiến tốt</Checkbox>
                    <Checkbox value="2">Mong muốn tìm được nơi làm việc có mức lương tốt</Checkbox>
                    <Checkbox value="3">Mong muốn tìm được nơi làm việc có cơ hội cống hiến bản thân tốt</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="input-element">
                <div className="title-element">Trình độ học vấn:</div>
                <Select
                  placeholder={"Chọn trình độ"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('academic_level', e)}
                  value={files.academic_level || undefined}
                >
                  {academicLevel.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div className="input-element">
                <div className="title-element">Nơi làm việc:</div>
                <Select
                  placeholder={"Chọn nơi làm việc bạn muốn"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('workplace', e)}
                  value={files.workplace || undefined}
                >
                  {listPosition.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div className="input-element">
                <div className="title-element">Loại hình công việc:</div>
                <Select
                  placeholder={"Chọn loại hình công việc bạn muốn"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('type_of_work', e)}
                  value={files.type_of_work}
                >
                  {typeOfWork.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div> 
              <div className="input-element">
                <div className="title-element">Mức lương:</div>
                <Select
                  placeholder={"Chọn mức lương bạn muốn"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('salary', e)}
                  value={files.salary}
                >
                  {salary.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div> 
              <div className="input-element">
                <div className="title-element">Mức lương tối đa:</div>
                <Select
                  placeholder={"Chọn mức lương"}
                  style={{ width: "100%" }}
                  onChange={e => this.onHandleChangeFiles('maximun_wage', e)}
                  value={files.maximun_wage}
                >
                  {salaryLevel.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div>
                <div style={{ fontWeight: 500, marginBottom: 5 }}>Mô tả mục tiêu:</div>
                <TextArea
                  placeholder="Nhập mô tả"
                  onChange={e => this.onHandleChangeFiles('describe_the_goal', e.target.value)}
                  value={files.describe_the_goal || undefined}
                />
              </div> 
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  academicDegree = () => {
    const { files } = this.state;

    return (
      <div>
        <div className="title">Học vấn bằng cấp</div>
        <div style={{ marginTop: 15, padding: 10 }}>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Trường, cơ sở, trung tâm đào tạo:</div>
              <Input
                placeholder={"Nhập tên cơ sở, trung tâm"}
                onChange={e => this.onHandleChangeFiles('training_places', e.target.value)}
                value={files.training_places || undefined}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Khoa đào tạo:</div>
              <Input
                placeholder={"Nhập khoa đào tạo"}
                onChange={e => this.onHandleChangeFiles('training_department', e.target.value)}
                value={files.training_department}
              />
            </div>
          </div>
          <div className="input-element">
            <div className="title-element">Tên bằng cấp chứng chỉ:</div>
            <Input
              placeholder={"VD: Kỹ sư CNTT..."}
              onChange={e => this.onHandleChangeFiles('degree', e.target.value)}
              value={files.degree}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Chuyên nghành đào tạo:</div>
              <Input
                placeholder={"VD: CNTT, Điện tử-viễn thông..."}
                onChange={e => this.onHandleChangeFiles('specialized', e.target.value)}
                value={files.specialized}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Xếp loại:</div>
              <Select
                placeholder={"Chọn"}
                style={{ width: "100%" }}
                onChange={e => this.onHandleChangeFiles('classification', e)}
                value={files.classification || undefined}
              >
                <Option value="Trung bình">Trung bình</Option>
                <Option value="Khá">Khá</Option>
                <Option value="Giỏi">Giỏi</Option>
                <Option value="Xuất sắc">Xuất sắc</Option>
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Thời gian bắt đầu học:</div>
              <DatePicker
                placeholder="Chọn thời gian"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                value={files.time_to_start_learning ? moment(files.time_to_start_learning) : undefined}
                onChange={(date, dateString) => this.onChangeDate(date, dateString, "time_to_start_learning")}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Thời gian kết thúc học:</div>
              <DatePicker
                placeholder="Chọn thời gian"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                value={files.time_to_end_learning ? moment(files.time_to_end_learning) : undefined}
                onChange={(date, dateString) => this.onChangeDate(date, dateString, "time_to_end_learning")}
              />
            </div>
          </div>
          <div className="input-element">
            <div className="title-element">Thông tin bổ sung:</div>
            <TextArea
              onChange={e => this.onHandleChangeFiles('additional_information', e.target.value)}
              value={files.additional_information}
            />
          </div> 
        </div>
      </div>
    )
  }

  workExperience = () => {
    const { files } = this.state;

    return (
      <div>
        <div className="title">Kinh nghiệm làm việc</div>
        <div style={{ marginTop: 15, padding: 10 }}>
          <div className="input-element">
            <div className="title-element">Chức danh/ vị trí:</div>
            <Input
              placeholder={"Nhập chức danh"}
              onChange={e => this.onHandleChangeFiles('comapny_position', e.target.value)}
              value={files.comapny_position}
            />
          </div>
          <div className="input-element">
            <div className="title-element">Công ty:</div>
            <Input
              placeholder={"Nhập tên công ty"}
              onChange={e => this.onHandleChangeFiles('comapny', e.target.value)}
              value={files.comapny || undefined}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Thời gian bắt đầu:</div>
              <DatePicker
                placeholder="Chọn thời gian"
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                value={files.time_to_start_work ? moment(files.time_to_start_work) : undefined}
                onChange={(date, dateString) => this.onChangeDate(date, dateString, "time_to_start_work")}
              />
            </div>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Thời gian kết thúc:</div>
              <DatePicker
                placeholder="Chọn thời gian"
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                value={files.time_to_end_work ? moment(files.time_to_end_work) : undefined}
                onChange={(date, dateString) => this.onChangeDate(date, dateString, "time_to_end_work")}
              />
            </div>
          </div>
          <Checkbox
            style={{ fontWeight: 500 }}
            onChange={check => this.onHandleChangeFiles('current_work', e.target.checked)}
            value={files.current_work}
          >
            Công việc hiện tại
          </Checkbox>
          <div className="input-element">
            <div className="title-element">Mô tả công việc:</div>
            <TextArea
              placeholder="Nhập mô tả"
              onChange={e => this.onHandleChangeFiles('work_description', e.target.value)}
              value={files.work_description}
            />
          </div> 
        </div>
      </div>
    )
  }

  skill = () => {
    const levelSkill = ["Sơ cấp", "Trung cấp", "Cao cấp", "Bản ngữ"]
    const { files } = this.state;

    return (
      <div>
        <div className="title">Kỹ năng</div>
        <div style={{ marginTop: 15, padding: 10 }}>
          <div className="input-element">
            <div className="title-element">Các kỹ năng chuyên môn:</div>
            <TextArea
              placeholder="Nhập kỹ năng chuyên môn"
              onChange={e => this.onHandleChangeFiles('advanced_skill_note', e.target.value)}
              value={files.advanced_skill_note}
            />
          </div> 
          <div>
            <div style={{ display: 'flex' }}>
              <CheckboxGroup
                style={{ display: 'grid', flex: 1 }}
                onChange={e => this.onHandleChangeFiles('advanced_skill', e.target.value)}
                value={files.advanced_skill}
              >
                <Checkbox style={{ marginLeft: 8 }} value="0">Kỹ năng tổ chức</Checkbox>
                <Checkbox value="1">Kỹ năng giao tiếp</Checkbox>
                <Checkbox value="2">Kỹ năng làm việc nhóm</Checkbox>
                <Checkbox value="3">Giải quyết vấn đề</Checkbox>
              </CheckboxGroup>
              <CheckboxGroup
                style={{ display: 'grid', flex: 1 }}
                onChange={e => this.onHandleChangeFiles('advanced_skill', e.target.value)}
              >
                <Checkbox style={{ marginLeft: 8 }} value="4">Kỹ năng lãnh đạo</Checkbox>
                <Checkbox value="5">Kỹ năng thuyết trình</Checkbox>
                <Checkbox value="6">Lập kế hoạch</Checkbox>
                <Checkbox value="7">Tư duy sáng tạo</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Kỹ năng ngoại ngữ:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">Tiếng anh:</span>
                <Select
                  placeholder={"Chọn"}
                  style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('language_skills', e.target.value)}
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">Tiếng nhật:</span>
                <Select
                  placeholder={"Chọn"} style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('language_skills', e.target.value)}
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">Tiếng trung:</span>
                <Select
                  placeholder={"Chọn"} style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('language_skills', e.target.value)}
                  value={files.language_skills}
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
            </div> 
            <div className="input-element" style={{ flex: 1 }}>
              <div className="title-element">Kỹ năng văn phòng:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">MS word:</span>
                <Select 
                  placeholder={"Chọn"} style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('office_skills', e.target.value)} 
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">MS excel:</span>
                <Select
                  placeholder={"Chọn"}
                  style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('office_skills', e.target.value)} 
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">MS power point:</span>
                <Select
                  placeholder={"Chọn"}
                  style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('office_skills', e.target.value)} 
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="title-element">MS outlook:</span>
                <Select
                  placeholder={"Chọn"}
                  style={{ width: "40%" }}
                  onChange={e => this.onHandleChangeFiles('office_skills', e.target.value)} 
                >
                  {levelSkill.map(item => 
                    <Option value={item}>{item}</Option>
                  )}
                </Select>
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
  }

  onChangeCurrentStep = (current) => {
    this.setState({ current });
  }

  render() {
    const { current } = this.state;

    return (
      <ContainerLayout>
        <Steps className="box" size="small" current={current} onChange={this.onChangeCurrentStep}>
          {this.steps.map(step => (
            <Step title={step.title} key={step.title}/>
          ))}
        </Steps>
        <div className="box" style={{ height: "fit-content", margin: 10, padding: 10, display: 'grid' }}>
          <div className="steps-content">{this.steps[current].content()}</div>
          <div className="steps-action">
            {current > 0 && (
              <Button icon={<LeftOutlined />} style={{ margin: '0 8px', background: 'red' }} onClick={() => this.prevStep()}>
                Quay lại
              </Button>
            )}
            {current < this.steps.length && (
              <Button icon={<SafetyOutlined />} type="primary" onClick={() => this.nextStep()}>
                Cập nhật
              </Button>
            )}
          </div>
        </div>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = ({ user, file }) => ({
  user: user.user,
  accessToken: user.accessToken,
  file: file.file
});

export default connect(
  mapStateToProps,
  { fetchFileByUser, updateFile })(levera(File));