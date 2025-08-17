import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ProvaResultado } from '../../types';

interface ParticipationChartProps {
  data: ProvaResultado[];
}

const ParticipationChart: React.FC<ParticipationChartProps> = ({ data }) => {
  const participationData = React.useMemo(() => {
    const uniqueStudents = new Set<string>();
    const evaluatedStudents = new Set<string>();
    
    data.forEach(item => {
      const studentKey = `${item.nome_aluno}-${item.turma}`;
      uniqueStudents.add(studentKey);
      
      if (item.avaliado) {
        evaluatedStudents.add(studentKey);
      }
    });

    const totalStudents = uniqueStudents.size;
    const participatingStudents = evaluatedStudents.size;
    const nonParticipatingStudents = totalStudents - participatingStudents;
    const participationRate = totalStudents > 0 ? (participatingStudents / totalStudents) * 100 : 0;

    return {
      totalStudents,
      participatingStudents,
      nonParticipatingStudents,
      participationRate
    };
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-2 rounded-lg">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Taxa de Participação
        </h3>
      </div>

      <div className="space-y-6">
        {/* Taxa de participação principal */}
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-600 mb-2">
            {participationData.participationRate.toFixed(1)}%
          </div>
          <p className="text-gray-600">Taxa de Participação</p>
        </div>

        {/* Breakdown detalhado */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Alunos Participantes
              </span>
              <span className="text-sm font-semibold text-green-600">
                {participationData.participatingStudents}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${participationData.totalStudents > 0 ? (participationData.participatingStudents / participationData.totalStudents) * 100 : 0}%` 
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Alunos Não Participantes
              </span>
              <span className="text-sm font-semibold text-red-600">
                {participationData.nonParticipatingStudents}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${participationData.totalStudents > 0 ? (participationData.nonParticipatingStudents / participationData.totalStudents) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total de Alunos:</span>
            <span className="font-semibold">{participationData.totalStudents}</span>
          </div>
        </div>
      </div>

      {participationData.totalStudents === 0 && (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum dado disponível</p>
        </div>
      )}
    </div>
  );
};

export default ParticipationChart;