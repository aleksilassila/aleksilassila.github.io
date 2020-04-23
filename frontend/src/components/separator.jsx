import theme from '../theme';

const Separator = () => (
  <div id="separator">
    <style jsx>{`
      #separator {
        height: 1px;
        width: 100%;
        margin: 14px 1px;
        background-color: ${theme.color.black}33;
      }
    `}</style>
  </div>
);
export default Separator;