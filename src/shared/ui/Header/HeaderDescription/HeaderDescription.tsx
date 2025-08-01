interface HeaderDescriptionProps {
  description: string;
}

const HeaderDescription = ({ description }: HeaderDescriptionProps) => {
  return (
    <div className="desktop:flex tablet:flex mobile:hidden items-center justify-center flex-shrink-0">
      <div className="text-base text-custom-textGrayColor font-semibold">
        {description}
      </div>
    </div>
  );
};

export default HeaderDescription;
