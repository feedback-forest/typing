interface PostTitleProps {
  title: string;
  author: string;
}

const PostTitle = ({ title, author }: PostTitleProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <div className="text-base font-medium">{title}</div>
      <div className="h-[10px] border-custom-textDescriptionGrayColor desktop:text-base tablet:text-base mobile:text-[12px] border-r desktop:pl-5 tablet:pl-5 mobile:pl-[5px] py-[5.5px]" />
      <div className="text-[13px] font-medium text-[#8D8D8D]">{author}</div>
    </div>
  );
};

export default PostTitle;
