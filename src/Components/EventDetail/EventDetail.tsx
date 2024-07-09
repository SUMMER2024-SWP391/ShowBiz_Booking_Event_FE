import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  RightOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
import { Button, Heading, Img, Text } from 'src/Components'
import subriceIcon from 'src/assets/images/subrice.png'
import logoOperator from 'src/assets/images/4cfdb889-3c60-4e0f-be90-f3d8e01c504a.webp'
import { Event } from 'src/@types/event.type'
import HandleRegisterEvent from '../HandleRegisterEvent/HandleRegisterEvent'

interface Props {
  event: Event
}

const EventDetail = ({ event }: Props, className: string) => {
  const time = event.date_event.split('/')
  const [dayStr, monthStr, yearStr] = time.map((item) => item.trim())
  const dateObj = new Date(`${yearStr}-${monthStr}-${dayStr}`)

  return (
    <div className={`${className} flex container-xs`}>
      <div className='flex md:flex-col'>
        <div className='flex w-[41%] flex-row items-start pb-[31px] md:w-full sm:pb-5 container-xs'>
          <div className='w-[40%] mr-[40px]'>
            <Img
              src={event.image}
              alt='thumnal_event'
              className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]'
            />
            <div className='flex flex-col'>
              <div className='flex flex-col items-start justify-between gap-5'>
                <div className='flex items-center justify-between gap-[15px]'>
                  <Img
                    src={logoOperator}
                    alt='subriceIcon'
                    className='h-[32px] w-[32px] rounded-[5px] object-cover'
                  />
                  <div className='flex flex-col items-start gap-0.5'>
                    <Text
                      size='xs'
                      as='p'
                      className='!font-medium !text-white-A700_cc'
                    >
                      Presented by
                    </Text>
                    <Text size='s' as='p'>
                      <span className='font-semibold text-white-A700'>
                        {event.event_operator.user_name}
                      </span>
                    </Text>
                  </div>
                  <RightOutlined className='mt-4 text-white-A700_cc' />
                  <Img
                    src={subriceIcon}
                    alt='subriceicon'
                    className='h-[49px] w-[14%] ml-9 object-cover'
                  />
                </div>
                <div className='flex gap-[15px]'>
                  <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                  <YoutubeOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                  <FacebookOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                </div>
              </div>
            </div>
            <div className='mt-11 flex flex-col items-start gap-[11px] self-stretch pb-2.5'>
              <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                <Text size='s' as='p' className='!text-white-A700_cc'>
                  Speacker
                </Text>
                <div className='h-px self-stretch bg-white-A700_5e' />
              </div>
              <div className='flex w-[77%] flex-col gap-3.5 md:w-full'>
                <Text
                  size='s'
                  as='p'
                  className='!text-white-A700_5e !font-monterat'
                >
                  {event.speaker_name}
                </Text>
                <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
                <div className='flex w-[93%] flex-col items-start gap-2 md:w-full'>
                  <Text size='s' as='p' className='!text-white-A700_cc'>
                    Sponser
                  </Text>
                  <div className='h-px self-stretch bg-white-A700_5e' />
                </div>
                <Text
                  size='s'
                  as='p'
                  className='!text-white-A700_5e !font-monterat'
                >
                  {event.sponsor_name}
                </Text>
                <InstagramOutlined className='h-[16px] w-[16px] text-white-A700_cc' />
              </div>
            </div>
            <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
              Contact the Host
            </Text>
            <Text size='s' as='p' className='mt-[19px] !text-white-A700_cc'>
              Report Event
            </Text>
          </div>
          <div className='flex w-[49%] flex-coll gap-2 md:w-full'>
            <div className='flex flex-col items-start'>
              <Heading
                size='s'
                as='h1'
                className='flex items-center justify-center rounded-[10px] bg-pink-normail p-[3px] '
              >
                <span className='text-pink-light p-1'>Featured in</span>
                <span className='text-white-A700 p-1'>Ho Chi Minh City</span>
              </Heading>
              <Heading
                size='4xl'
                as='h3'
                className='mt-[20px] !text-white-A700 w-full !font-monterat leading-[39px]'
              >
                {/* SaiGon Talk kỳ 8: Feelink - Feel Cảm Xúc, Link Sự Nghiệp */}
                {event.name}
              </Heading>
              <div className='mt-[15px] flex items-center gap-[21px]'>
                <div className='flex flex-col items-center gap-[3px] rounded-md border border-solid border-white-A700 pb-0.5 shadow-sm'>
                  <div className='flex w-[33px] justify-center rounded-tl-md rounded-tr-md border border-solid border-white-A700 bg-pink-normail px-[3px] pb-0.5 pt-[3px]'>
                    <Heading size='xs' as='h4' className='!font-monterat '>
                      {dateObj.toLocaleString('en-US', {
                        month: 'short'
                      })}
                    </Heading>
                  </div>
                  <Text size='md' as='p' className='!font-monterat'>
                    {time[0]}
                  </Text>
                </div>
                <div className='flex flex-col items-start gap-1 self-start'>
                  <Heading size='lg' as='h5' className='!text-white-A700'>
                    {/* Thursday, May 9 */}
                    {event.date_event}
                  </Heading>
                  <Text size='md' as='p' className='!font-monterat'>
                    {/* 5:30 PM - 8:30 PM */}
                    {event.time_start} - {event.time_end}
                  </Text>
                </div>
              </div>
              <div className='flex items-center gap-[21px]'>
                <div className='mt-[22px] flex items-center gap-[21px] rounded-md border border-solid border-white-A700 pb-0.5 shadow-sm'>
                  <Button
                    size='2xl'
                    variant='outline'
                    shape='round'
                    className='w-[33px] h-[33px] !rounded-md'
                  >
                    <EnvironmentOutlined className='text-white-A700_cc' />
                  </Button>
                </div>
                <div className='flex flex-col items-start mt-[22px] gap-[5px] self-start'>
                  <Heading size='lg' as='h6' className='!text-white-A700'>
                    Register to See Address
                  </Heading>
                  <Text size='md' as='p' className='!font-monterat'>
                    {/* Thành phố Thủ Đức, Thành Phố Hồ Chí Minh */}
                    {event.address}
                  </Text>
                </div>
              </div>
              <HandleRegisterEvent event={event} />

              <Text size='s' as='p' className='!text-white-A700 ml-1.5 mt-[30px] md:ml-0'>
                About Event
              </Text>
              <div className='flex flex-col items-start'>
                <div className='mt-4 ml-6 h-px self-stretch bg-white-A700_99 md:ml-0' />
                <Text
                  size='md'
                  as='p'
                  className='mt-[17px] w-[98%] leading-4 md:w-full !font-medium !font-monterat'
                >
                  <>
                    {/* ​Phát triển IQ luôn là xu hướng chung của xã hội hiện đại
                  đề cao, trong khi vai trò của chỉ số cảm xúc (EQ) - một
                  trong những yếu tố then chốt dẫn đến thành công, vẫn chưa
                  được nhận thức đầy đủ. Saigon Talk kỳ 8 chính thức quay
                  trở lại để “giải oan” cho EQ khỏi định kiến "không đáng
                  lưu tâm", đồng thời giúp bạn giải mã sức mạnh tiềm ẩn của
                  nó trên con đường phát triển sự nghiệp bản thân.
                  <br />
                  <br />
                  Trong số kỳ này, Saigon Talk 8 mang đến chủ đề “FEELINK”
                  với trọng tâm khai phá tiềm năng của EQ (chỉ số cảm xúc)
                  trong việc phát triển sự nghiệp cá nhân. Góp phần đặc biệt
                  tại sân khấu buổi chia sẻ lần này xin bật mí bộ đôi khách
                  mời uy tín: ​🎙️ TIẾN SĨ TÂM LÝ HỌC TÔ NHI A: một trong
                  những chuyên gia tâm lý học hàng đầu Việt Nam. Không chỉ ở
                  vai trò giảng viên mà còn là nhà nghiên cứu tâm lý dày dặn
                  kinh nghiệm, đang đảm nhiệm nhiều vị trí quan trọng: ​-
                  Giảng viên Trường Đại học Kinh tế - Tài chính TP.HCM
                  (UEF). ​- Nhà sáng lập Công ty đào tạo - truyền thông Khải
                  Nguyên. ​- Giảng viên cao cấp và chuyên gia tham vấn trị
                  liệu tâm lý tại Công ty đào tạo & Chăm sóc sức khỏe tâm
                  thần Ý Tưởng Việt. ​ 🎙️ Á HẬU QUỐC TẾ PHẠM HỒNG THÚY VÂN:
                  không chỉ là một Á hậu xinh đẹp, tài năng mà còn là một
                  doanh nhân thành công với sứ mệnh truyền cảm hứng cho cộng
                  đồng. Thuộc top 50 nữ lãnh đạo Châu Á cùng nhiều danh hiệu
                  khác, Thúy Vân sẽ góp mặt tại buổi chia sẻ để mang đến
                  những trải nghiệm, lời khuyên bổ ích dành cho các bạn tham
                  dự. ​Với thông điệp “Feel cảm xúc, link sự nghiệp”,
                  talkshow mang đến trải nghiệm: ​⭐ "Feel" cùng chuyên gia:
                  Lắng nghe chia sẻ từ 2 diễn giả giàu kinh nghiệm về cách
                  thức "Feel" (cảm nhận) cảm xúc một cách hiệu quả để ứng
                  dụng EQ vào thực tế. ​⭐ "Link" với thành công: Tham gia
                  thảo luận, kết nối và học hỏi bí quyết từ cộng đồng những
                  người trẻ tại buổi chia sẻ, cùng nhau nối kết để khám phá
                  giới hạn và chinh phục mục tiêu tương lai. ​⭐ Thưởng thức
                  tiết mục trình diễn sôi động, hấp dẫn. ​⭐ Minigame cùng
                  những phần quà xịn xò từ BTC. ​⭐ Nhâm nhi trà bánh tại
                  tiệc tea break vào cuối buổi. ​📌 THÔNG TIN CHI TIẾT VỀ
                  CHƯƠNG TRÌNH: ​👥 Đối tượng: toàn bộ học sinh, sinh viên
                  trên khắp cả nước tham gia. ​⏳ Thời gian: 17:30 - 20:30,
                  Thứ năm ngày 09/05/2024. ​🏫 Địa điểm: Hall Business,
                  Trường Đại học FPT TP.HCM (Lô E2a-7, Đường D1, Khu Công
                  Nghệ Cao, P.Long Thạnh Mỹ, Tp.Thủ Đức, TP.HCM) ​💥 Không
                  chỉ là buổi chia sẻ mà là hành trình khai phá bản thân.
                  Còn chần chờ gì nữa? Hãy đăng ký tham dự Saigon Talk Kỳ 8
                  ngay thôi nào!
                  <br />
                  _______________________
                  <br />
                  <br />
                  🧠 SAIGON TALK KỲ 8: FEELINK - FEEL CẢM XÚC, LINK SỰ
                  NGHIỆP🧠 <br />
                  ​Mọi thắc mắc vui lòng liên hệ với chúng mình qua:
                  <br />
                  ​Fanpage: Câu lạc bộ Truyền thông Cóc Sài Gòn
                  <br /> ​Mail: saigontalk.csg@gmail.com <br />
                  ​SĐT: 039 564 0607 (Project Leader: Hoàng Thiên Hương) */}
                    {event.description}
                  </>
                </Text>
                <div className='mt-9 flex flex-col items-start gap-2 self-stretch '>
                  <Text size='s' as='p' className='!text-white-A700'>
                    {`Location ${event.location}`}
                  </Text>
                  <div className='ml-6 h-px self-stretch bg-white-A700_99 md:ml-0' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
